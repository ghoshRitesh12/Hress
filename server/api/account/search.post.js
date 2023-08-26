import User from "~/server/models/User.model"
import { serverSearchProfileSchema } from "~/utils/searchProfileSchema";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const queryFields = ['role', 'referralId'];
    
    const body = await readBody(event);
    await serverSearchProfileSchema.validate(body);

    const foundUser = await User.findOne({ referralId: body.referralId }, queryFields)
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found"
      }))
    }
    
    if(foundUser.role === 'admin') {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Already an admin"
      }))
    }
    
    
    return {
      redirectTo: `/admin/profile/${foundUser.referralId}/about`,
    }

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
