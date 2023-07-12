import User from "~/server/models/User.model";
import getATO from "~/server/helpers/getATO";
import getDevelopmentIncentive from "~/server/helpers/getDevelopmentIncentive";
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

    const queryFields = ['rank', 'active'];
    const res = {
      totalDevIncentive: 0,
      rankWiseDevIncentive: [],
    }
    const devIncentiveMinEligibilityRank = 7;
    const ato = await getATO()
    console.log('ATO: ', ato);

    const foundUser = await User.findOne({ referralId: paramReferralId }, queryFields)
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if(foundUser.rank < devIncentiveMinEligibilityRank) return res;

    const frequencies = await User.aggregate([
      {
        $match: {
          rank: { 
            $gt: devIncentiveMinEligibilityRank - 1, 
            $lt: foundUser.rank + 1
          },
          active: { $eq: true }
        }
      },
      {
        $group: {
          _id: '$rank',
          members: { $sum: 1 }
        }
      },
      {
        $project: {
          rank: '$_id',
          members: 1,
          _id: 0
        }
      },
      { 
        $sort: { rank: 1 } 
      }
    ]).readConcern('majority')

    for (let i=devIncentiveMinEligibilityRank; i<frequencies.at(-1).rank; i++) {
      const foundOb = frequencies.findIndex(f => f.rank === i)
      if(foundOb === -1) {
        frequencies.push({
          members: 0,
          rank: i
        })
      }
    }
    console.log('comp: ', frequencies);

    const ob = { rank: 1, members: 0 }
    res.rankWiseDevIncentive = frequencies.map(frequency => {
      ob.rank = frequency.rank;
      ob.members = frequency.members;

      for(let freq of frequencies) {
        if(freq.rank > frequency.rank) {
          ob.members = ob.members + freq.members
        }
      }
      if(frequency.members === 0) {
        ob.members = 1
      }

      const devRankIncentive = (ato * (getDevelopmentIncentive(ob.rank) / 100)) / ob.members
      const incentive = parseFloat(devRankIncentive.toFixed(2));
      res.totalDevIncentive += incentive

      return {
        rank: ob.rank,
        eligibleMembers: ob.members,
        incentive
      };
    }).sort((a, b) => a.rank - b.rank)

    console.log('final: ', res.rankWiseDevIncentive)

    
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
