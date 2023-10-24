import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = {
      _id: 0,
      levels: 1,
      rank: 1,
      active: 1
    };
    const res = {
      levels: [],
      totalLevelIncome: 0,
      userActive: false
    }
    const maxIncomeLevel = 15;

    // const currentMonth = 7 || new Date().getMonth() + 1;
    // const currentYear = new Date().getFullYear();

    const foundUser = await User.findOne({ 'info.email': event?.user?.email })
      .select(queryFields)
      .readConcern('majority')
      .populate({ path: 'levels.referrals.userRef', select: ['courseType', 'active'] })
      .slice('levels', maxIncomeLevel)
      .lean();

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    res.userActive = foundUser.active
    if (!res.userActive) return res;

    for (const level of foundUser.levels) {
      let levelIncome = 0;

      for (const referral of level.referrals) {
        if (!referral?.userRef?.active || referral.commission <= 0) continue;

        const joiningFees = (
          referral.userRef.courseType === 'advance' ?
            20000 :
            (referral.userRef.courseType === 'basic' ? 12000 : 0)
        );

        if (referral.commission > 20) {
          const levelCommission = referral.commission - 20;
          const spilloverCommission = referral.commission - levelCommission;
          const totalCommission = (joiningFees * (spilloverCommission / 100)) + (joiningFees * (levelCommission / 100))

          levelIncome += totalCommission
          continue;
        }

        levelIncome += (joiningFees * (referral.commission / 100))
      }

      res.totalLevelIncome += levelIncome
      res.levels.push({
        levelNo: level.levelNo,
        levelMembers: level.referrals.length,
        levelIncome
      })
    }

    setResponseStatus(event, 200)
    return res;

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong'
    }))
  }
})
