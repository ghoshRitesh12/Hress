import mongoose from "mongoose";
import User from "../../models/User.model";
import { getIncentive, isRankValid } from "../../helpers/utils.js";



export default eventHandler(async (event) => {
  const signupSession = await mongoose.startSession();
  signupSession.startTransaction()
  
  try {
    const body = await readBody(event);
    console.log(body);
    // verify body schema
    // use passport
 
    // return '';
    const foundUser = await User.findOne({ email: body.email }).session(signupSession);
    if(foundUser) {
      throw sendError(event, createError({
        statusCode: 409, 
        message: 'User already exists',
      })) 
    }

    const sponsorer = await User.findOne({ referralId: body.sponsorerId }).session(signupSession);
    if(!sponsorer) {
      throw createError({
        statusCode: 404,
        message: 'Sponsorer not found'
      })
    }
    const spillOverIncentive = 20;
    
    
    const newUserInfo = [{
      name: body.fullname,
      email: body.email,
      courseType: body.course,
      ancestors: [...sponsorer.ancestors, `${sponsorer._id}`].sort()
    }]
    const newUser = (await User.create(newUserInfo, { session: signupSession }))[0];

    // for each ancestor
    const ancestors = await User.find({ _id: { $in: newUser.ancestors } }).session(signupSession);
    const sponsorAncestorReferralIds = ancestors.slice(0, -1).map(a => a.referralId);
    console.log(sponsorAncestorReferralIds);

    const updateOperations = ancestors.map((ancestor, index) => {
      const indexedLevel = ancestors.length - index;
     
      let incentive = (ancestors.length <= 15) ? getIncentive(indexedLevel) : 0

      if(`${ancestor._id}` === `${newUser.ancestors.at(-1)}` && sponsorAncestorReferralIds.includes(body.refererId)) {
        incentive = -1;
      }

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
        if(isRankValid(level.levelNo, level.referrals.length)) {
          tempRank = level.levelNo === 0 ? 1 : level.levelNo
        }
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
    })

    await User.bulkWrite(updateOperations, { session: signupSession })

    await signupSession.commitTransaction()

    setResponseStatus(event, 201);
    return {
      message: 'Account created successfully'
    };
    
  } catch (err) {
    await signupSession.abortTransaction();
    console.log(err);

    setResponseStatus(event, 500);
    return { 
      errorMessage: 'Account creation unsuccessful, try again' 
    };

  } finally {
    await signupSession.endSession();
  }
})
