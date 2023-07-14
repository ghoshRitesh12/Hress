import User from "../../models/User.model";
import Otp from "../../models/Otp.model";
import { hash } from "bcrypt";
import { startSession } from "mongoose";
import { serverSignupSchema } from "~/utils/signupSchema";
import { getIncentive, isRankValid } from "../../helpers/utils.js";
import { performance } from "perf_hooks";

export default eventHandler(async (event) => {
  const start = performance.now();
  const signupSession = await startSession();
  signupSession.startTransaction({
    readConcern: 'snapshot',
    writeConcern: {
      w: 'majority', j: true
    }
  })

  try {
    const body = await readBody(event);
    await serverSignupSchema.validate(body);    

    const tempUser = await Otp.findOne({ email: body.email }).session(signupSession);
    if(!tempUser) {
      await signupSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 401, 
        statusMessage: 'Otp has expired, try 10 mins later',
      }))
    }
    if(tempUser.otp !== parseInt(body.otp)) {
      await signupSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 403, 
        statusMessage: 'Invalid OTP, try 10 mins later',
      }))
    }
    await Otp.deleteOne({ email: body.email });

    

    if(await User.exists({ 'info.email': body.email }).session(signupSession)) {
      await signupSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 409, 
        statusMessage: 'User already exists',
      }))
    }

    const spillOverIncentive = 20;
    const sponsorerQueryFields = ['active', 'ancestors', 'referralId']
    const sponsorer = await User.findOne({ referralId: body.sponsorerId }, sponsorerQueryFields)
      .session(signupSession);
    if(!sponsorer) {
      await signupSession.abortTransaction();
      return createError({
        statusCode: 404,
        statusMessage: 'Sponsorer not found'
      })
    }
    if(!sponsorer.active) {
      await signupSession.abortTransaction();
      return createError({
        statusCode: 403,
        statusMessage: 'Sponsorer account inactive'
      })
    }


    if(body.refererId) {
      const refererQueryFields = ['active', 'levels']
      const referer = await User.findOne({ referralId: body.refererId }, refererQueryFields).session(signupSession);
      if(!referer) {
        await signupSession.abortTransaction();
        return sendError(event, createError({
          statusCode: 400, 
          statusMessage: 'Referer not found',
        }))
      }
      if(!referer.active) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 403,
          statusMessage: 'Referer account inactive'
        })
      }

      const sponsorerAncestors = sponsorer.ancestors.map(i => `${i._id}`);
      const sponsorersRefererIndex = sponsorerAncestors.indexOf(`${referer._id}`)
      if(sponsorersRefererIndex === -1) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 400,
          statusMessage: 'Referer not related to sponsorer'
        })
      }

      const refererIndexedLevel = sponsorerAncestors.length - sponsorersRefererIndex;
      if(refererIndexedLevel >= 15) {
        await signupSession.abortTransaction();
        return createError({
          statusCode: 400,
          statusMessage: 'Referer reached max spillover level'
        })
      }
    }

    
    const newUserInfo = [{
      info: {
        name: body.fullname,
        email: body.email,
      },
      courseType: body.course,
      verified: true,
      password: await hash(
        body.password, parseInt(useRuntimeConfig().PWD_SALT)
      ),
      ancestors: [...sponsorer.ancestors, `${sponsorer._id}`].sort()
    }]
    const newUser = (await User.create(newUserInfo, { session: signupSession }))[0];


    // for each ancestor
    const ancestorsQueryFields = ['referralId', 'role', 'levels', 'rank'];
    const ancestors = await User.find({ _id: { $in: newUser.ancestors } }, ancestorsQueryFields).session(signupSession);
    console.log(ancestors);
    const sponsorAncestorReferralIds = ancestors.slice(0, -1).map(a => a.referralId);


    const updateOperations = ancestors.map((ancestor, index) => {
      const indexedLevel = ancestors.length - index;
      if(ancestor.role !== 'admin' && indexedLevel > 15) return null;
      
      let incentive = (ancestors.length <= 15) ? getIncentive(indexedLevel) : 0
      // indirect spillover
      if(`${ancestor._id}` === `${newUser.ancestors.at(-1)}` && sponsorAncestorReferralIds.includes(body.refererId)) {
        incentive = -1;
      }
      // direct spillover
      if(ancestor.referralId === body.refererId && body.refererId !== sponsorer.referralId) {
        incentive = spillOverIncentive + getIncentive(indexedLevel)
      }
      incentive = (ancestors.length <= 15) ? incentive : 0

      
      // inserting new member
      const foundLevelIndex = ancestor.levels.findIndex(level => level.levelNo === indexedLevel);
      if(foundLevelIndex !== -1) {
        ancestor.levels[foundLevelIndex].referrals.push({
          commission: incentive,
          userRef: newUser._id
        })
      } else {
        ancestor.levels.push({
          levelNo: indexedLevel,
          referrals: {
            commission: incentive,
            userRef: newUser._id
          }
        })
      }

      // setting rank
      let tempRank = 1;
      for(const level of ancestor.levels) {
        if(!isRankValid(level.levelNo, level.referrals.length)) {
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

    const end = performance.now()
    console.log('\n', end-start, '\n')

    setResponseStatus(event, 201);
    return {
      message: 'Account created successfully 🎉'
    };
    
  } catch (err) {
    console.log(err);
    await signupSession.abortTransaction();

    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Account creation unsuccessful, try again'
    }))

  } finally {
    await signupSession.endSession();
  }
})
