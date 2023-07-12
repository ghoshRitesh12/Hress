import User from "~/server/models/User.model";
import { serverSearchProfileSchema } from "~/utils/searchProfileSchema";
import { serverCourseSchema } from "~/utils/adminInfoSchema";
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
    console.log(body);
    await serverCourseSchema.validate(body);

    const queryFields = ['courseType'];

    const foundUser = await User.findOne({ referralId: paramReferralId }, queryFields)
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if(foundUser.courseType === body.course) {
      setResponseStatus(event, 200)
      return {
        message: `Course already set`
      };
    }

    foundUser.courseType = body.course?.toLowerCase();
    await foundUser.save();
    
    setResponseStatus(event, 200)
    return {
      message: `Course set successfully`
    };
    
  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
