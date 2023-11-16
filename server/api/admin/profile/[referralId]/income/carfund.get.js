import User from "~/server/models/User.model";
import getBiMonthlyCTO from "~/server/helpers/cto";
import { serverSearchProfileSchema } from "~/utils/searchProfileSchema";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const paramReferralId = event?.context?.params?.referralId;
    await serverSearchProfileSchema.validate({
      referralId: paramReferralId
    }).catch(() => {
      throw createError({
        statusCode: 400,
        statusMessage: 'Referral id required',
      })
    })

    const queryFields = {
      _id: 0,
      rank: 1,
    };
    const res = {
      carFund: -1,
      eligible: false,
    }
    const carFundIncentive = 3; // 3% of C.T.O
    const carFundMinEligibilityRank = 7; // 7
    const carFundMaxEligibilityRank = 12;

    const foundUser = await User.findOne({ referralId: paramReferralId })
      .readConcern('majority')
      .select(queryFields)
      .lean();
    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if (foundUser.rank < carFundMinEligibilityRank) return res;

    const [biMonthlyCTO, totalEligibleUsers] = await Promise.all([
      getBiMonthlyCTO(),
      User.aggregate([
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
      ]).readConcern("majority")
    ])

    const frequency = totalEligibleUsers?.[0]?.frequency || 1;
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
