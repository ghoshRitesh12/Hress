import Otp from "../../models/Otp.model";
import User from "../../models/User.model";
import Income from "~/server/models/Income.model";
import ActiveToken from "~/server/models/ActiveToken.model";
import { hash } from "bcrypt";
import { startSession } from "mongoose";
import { serverSignupSchema } from "~/utils/signupSchema";
import { getIncentive, isRankValid } from "../../helpers/utils.js";

export default eventHandler(async (event) => {
  const signupSession = await startSession();
  signupSession.startTransaction({
    readConcern: "snapshot",
    writeConcern: {
      w: "majority",
      journal: true
    }
  })

  try {
    const body = await readBody(event);
    await serverSignupSchema.validate(body);

    const tempUser = await Otp.findOne({ email: body.email }).session(signupSession);
    if (!tempUser) {
      await signupSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: "Otp has expired, try 10 mins later",
      }))
    }
    if (tempUser.otp !== Number(body.otp)) {
      await signupSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: "Invalid OTP, try again",
      }))
    }
    await Otp.deleteOne({ email: body.email }).session(signupSession);



    if (await User.exists({ 'info.email': body.email }).session(signupSession)) {
      await signupSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "User already exists",
      }))
    }

    const spillOverIncentive = 20;
    const sponsorerQueryFields = {
      _id: 1,
      active: 1,
      ancestors: 1,
      referralId: 1
    }
    const sponsorer = await User.findOne({ referralId: body.sponsorerId })
      .session(signupSession)
      .select(sponsorerQueryFields)
    if (!sponsorer) {
      await signupSession.abortTransaction();
      return createError({
        statusCode: 404,
        statusMessage: "Sponsorer not found"
      })
    }
    if (!sponsorer.active) {
      await signupSession.abortTransaction();
      return createError({
        statusCode: 403,
        statusMessage: "Sponsorer account inactive"
      })
    }


    if (body?.refererId) {
      const referer = await User.findOne({ referralId: body.refererId })
        .session(signupSession)
        .select({ _id: 1, active: 1 });

      if (!referer) {
        await signupSession.abortTransaction();
        return sendError(event, createError({
          statusCode: 400,
          statusMessage: "Referer not found",
        }))
      }
      if (!referer.active) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 403,
          statusMessage: "Referer account inactive"
        })
      }

      const sponsorerAncestors = sponsorer.ancestors.map(a => `${a._id}`);
      const sponsorersRefererIndex = sponsorerAncestors.indexOf(`${referer._id}`)
      if (sponsorersRefererIndex === -1) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 403,
          statusMessage: "Referer not related to sponsorer"
        })
      }

      const refererIndexedLevel = sponsorerAncestors.length - sponsorersRefererIndex;
      if (refererIndexedLevel >= 12) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 409,
          statusMessage: "Referer reached max spillover level"
        })
      }
    }

    let isAccountActive = false;
    let foundActiveToken = null;
    if (body?.activeToken) {
      foundActiveToken = await ActiveToken.findOne({ token: body.activeToken })
        .session(signupSession)
        .select({ usedBy: 1 }) || null;

      // used active token
      if (foundActiveToken?.usedBy) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 403,
          statusMessage: "Your active token has expired"
        })
      }

      isAccountActive = foundActiveToken ? true : false;
    }


    const newUserInfo = [{
      info: {
        name: body.fullname,
        email: body.email,
      },
      password: await hash(
        body.password, parseInt(useRuntimeConfig().PWD_SALT)
      ),
      verified: true,
      active: isAccountActive,
      courseType: body.course,
      ancestors: [...sponsorer.ancestors, `${sponsorer._id}`].sort()
    }]
    const newUser = (await User.create(newUserInfo, { session: signupSession }))[0];


    // setting active token usedBy
    if (foundActiveToken) {
      foundActiveToken.usedBy = newUser.referralId
      await foundActiveToken.save({ session: signupSession })
    }

    await Income.create(
      [{
        email: newUser.info.email,
        referralId: newUser.referralId,
        userProfile: newUser._id,
      }],
      { session: signupSession }
    )

    // for each ancestor
    const ancestorsQueryFields = {
      _id: 1,
      role: 1,
      rank: 1,
      levels: 1,
      referralId: 1,
    };

    // ancestorIds -> newUser.ancestors 
    const ancestors = await User.find({ _id: { $in: newUser.ancestors } })
      .session(signupSession)
      .select(ancestorsQueryFields);
    const sponsorAncestorReferralIds = ancestors.slice(0, -1).map(a => a.referralId);


    const updateOperations = ancestors.map((ancestor, index) => {
      const indexedLevel = ancestors.length - index;
      if (ancestor.role !== 'admin' && indexedLevel > 15) return null;


      let incentive = getIncentive(indexedLevel)
      // indirect spillover
      if (`${ancestor._id}` === `${newUser.ancestors.at(-1)}` && sponsorAncestorReferralIds.includes(body.refererId)) {
        incentive = -1;
      }
      // direct spillover
      if (ancestor.referralId === body.refererId && body.refererId !== sponsorer.referralId) {
        incentive = spillOverIncentive + getIncentive(indexedLevel)
      }


      // inserting new member
      const d = new Date();
      const memberCreatedAt = `${d.getDate() <= 15 ? 15 : 30}-${d.getMonth() + 1}-${d.getFullYear()}`;
      const foundLevelIndex = ancestor.levels.findIndex(level => level.levelNo === indexedLevel);
      if (foundLevelIndex !== -1) {
        ancestor.levels[foundLevelIndex].referrals.push({
          commission: incentive,
          userRef: newUser._id,
          createdAt: memberCreatedAt,
        })
      } else {
        ancestor.levels.push({
          levelNo: indexedLevel,
          referrals: {
            commission: incentive,
            userRef: newUser._id,
            createdAt: memberCreatedAt,
          }
        })
      }

      // setting rank
      let tempRank = 1;
      for (const level of ancestor.levels) {
        if (!isRankValid(level.levelNo, level.referrals.length)) {
          break;
        }
        tempRank = level.levelNo === 0 ? 1 : level.levelNo
      }
      ancestor.rank = tempRank;


      return {
        updateOne: {
          filter: { _id: ancestor._id },
          update: {
            $set: {
              levels: ancestor.levels,
              rank: ancestor.rank
            }
          }
        }
      };
    }).filter(i => i !== null);

    await User.bulkWrite(updateOperations, { session: signupSession })
    await signupSession.commitTransaction()

    setResponseStatus(event, 201);
    return {
      message: "Account created successfully 🎉"
    };

  } catch (err) {
    console.log(err);
    await signupSession.abortTransaction();

    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Account creation unsuccessful, try again"
    }))

  } finally {
    await signupSession.endSession();
  }
})
