import User from "~/server/models/User.model";
import getBiMonthlyCTO from "~/server/helpers/cto";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = {
      _id: 0,
      rank: 1,
      active: 1
    };
    const res = {
      carFund: -1,
      eligible: false,
      userActive: false
    }
    const carFundIncentive = 3; // 3% of C.T.O
    const carFundMinEligibilityRank = 7; // 7
    const carFundMaxEligibilityRank = 12; // 12

    const foundUser = await User.findOne({ 'info.email': event?.user?.email })
      .readConcern('majority')
      .select(queryFields)
      .lean()
    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found"
      }))
    }

    res.userActive = foundUser.active
    if (!res.userActive) return res;
    if (foundUser.rank < carFundMinEligibilityRank) return res;

    const biMonthlyCTO = await getBiMonthlyCTO();

    const totalEligibleUsers = await User.aggregate([
      {
        $match: {
          rank: {
            $gte: carFundMinEligibilityRank,
            $lte: carFundMaxEligibilityRank
          },
          active: { $eq: true }
        }
      },
      {
        $project: {
          _id: 1
        }
      },
      {
        $count: "frequency"
      }
    ]).readConcern('majority');

    const frequency = totalEligibleUsers?.[0]?.frequency ?? 1;

    res.eligible = true;
    res.carFund = (((carFundIncentive / 100)) * biMonthlyCTO) / frequency;

    setResponseStatus(event, 200)
    return res

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
