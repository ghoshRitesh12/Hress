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

    const body = await readBody(event);
    if(typeof body?.active !== 'boolean') {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Invalid payload type'
      }))
    }

    const queryFields = ['active'];

    const foundUser = await User.findOne({ referralId: paramReferralId }, queryFields)
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    // maybe do some ATO stuff??
    if(foundUser.active === body.active) {
      setResponseStatus(event, 200)
      return {
        message: `Profile already ${foundUser.active ? 'active': 'inactive'}`
      };
    }

    foundUser.active = body.active;
    await foundUser.save();
    
    setResponseStatus(event, 200)
    return {
      message: `Profile successfully ${foundUser.active ? 'activated': 'deactivated'}`
    };
    
  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
