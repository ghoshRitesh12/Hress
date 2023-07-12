import User from "~/server/models/User.model";
import getATO from "~/server/helpers/getATO";
import getTrainerIncentive from "~/server/helpers/getTrainerIncentive";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = [
      'levels', 'rank', 'active',
    ];
    const res = { 
      levels: [],
      trainerIncentive: 0,
      totalLevelIncome: 0,
      userActive: false
    }

    const foundUser = await User.findOne({ 'info.email': event?.user?.email }, queryFields)
      .readConcern('majority')
      .populate({ path: 'levels.referrals.userRef', select: ['courseType', 'active'] })
      
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    res.userActive = foundUser.active
    if(!res.userActive) return res;

    res.levels = foundUser.levels.slice(0, 15).map(level => {
      let levelIncome = 0;

      level.referrals.map(referral => {
        if(!referral?.userRef?.active || referral.commission <= 0) return;

        const joiningFees = (
          referral.userRef.courseType === 'advance' ? 
          20000 : 
          (referral.userRef.courseType === 'basic' ? 12000 : 0)
        );

        if(referral.commission > 20) {
          const levelCommission = referral.commission - 20;
          const spilloverCommission = referral.commission - levelCommission;
          const totalCommission = (joiningFees * (spilloverCommission / 100)) + (joiningFees * (levelCommission / 100))

          levelIncome += totalCommission
          return;
        }

        levelIncome += (joiningFees * (referral.commission / 100))

      })

      res.totalLevelIncome += levelIncome

      return {
        levelNo: level.levelNo,
        levelMembers: level.referrals.length,
        levelIncome
      }
    })

    const ato = await getATO();
    res.trainerIncentive = getTrainerIncentive(foundUser.rank, ato)

    setResponseStatus(event, 200)
    return res


  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong'
    }))
  }
})
