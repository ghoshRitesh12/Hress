import mongoose from "mongoose";
import User from "../models/User.model.js";
import { getIncentive, isRankValid } from "../helpers/utils.js";



export default eventHandler(async (event) => {
  const signupSession = await mongoose.startSession();
  signupSession.startTransaction()
  
  try {
    const body = await readBody(event);
    console.log(body);
    // verify body schema
    // use passport
 
    const foundUser = await User.findOne({ email: body.email }).session(signupSession);
    if(foundUser) {
      throw createError({
        statusCode: 409, 
        message: 'User already exists',
        stack: null
      })
    }

    const sponsorer = await User.findOne({ referralId: body.sponsorerId }).session(signupSession);
    if(!sponsorer) {
      throw createError({
        statusCode: 404,
        message: 'Sponsorer not found'
      })
    }
    
    
    const newUserInfo = [{
      name: body.name,
      email: body.email,
      ancestors: (sponsorer.ancestors.length <= 15) ? [...sponsorer.ancestors, `${sponsorer._id}`].sort() : []
    }]
    const newUser = (await User.create(newUserInfo, { session: signupSession }))[0];

    // for each ancestor
    const ancestors = await User.find({ _id: { $in: newUser.ancestors } }).session(signupSession);
    console.log(ancestors);

    const updateOperations = ancestors.map((ancestor, index) => {
      const indexedLevel = ancestors.length - index;
      
      // inserting new member
      const foundLevelIndex = ancestor.levels.findIndex(level => level.levelNo === indexedLevel);
      if(foundLevelIndex !== -1) {
        ancestor.levels[foundLevelIndex].referrals.push(newUser._id);
      } else {
        ancestor.levels.push({
          levelNo: indexedLevel,
          commission: getIncentive(indexedLevel),
          referrals: [newUser._id]
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

    await signupSession.commitTransaction();

    event.node.res.statusCode = 201;
    return {
      message: 'Account created successfully'
    };
    
  } catch (err) {
    await signupSession.abortTransaction();
    console.log(err);

    event.node.res.statusCode = 500;
    return { 
      errorMessage: 'Account creation unsuccessful, try again' 
    };

  } finally {
    await signupSession.endSession();
  }
})
