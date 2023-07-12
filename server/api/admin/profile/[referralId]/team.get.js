import User from "~/server/models/User.model";
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

    const queryFields = [
      'ancestors', 'levels', 'active'
    ];
    const res = { sponsorer: null, levels: [] }

    const foundUser = await User.findOne({ referralId: paramReferralId }, queryFields)
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    res.levels = (await foundUser.populate({ 
      path: 'levels.referrals.userRef',
      select: ['info.name', 'rank']
    })).levels

    res.sponsorer = (await foundUser.populate({ 
      path: 'ancestors',
      select: ['info.name', 'referralId'] 
    })).ancestors.at(-1) || null

    setResponseStatus(event, 200)
    return res;
    
  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
