import User from "~/server/models/User.model"
import { serverAnyTimeInfoSchema } from "~/utils/anyTimeInfoSchema";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = [
      'info.phoneNumber', 'info.xlmWalletAddress',
      'info.country', 'info.cityState', 
      'info.postalCode', 'info.streetAddress',
      'active', 'verified'
    ];
    
    const body = await readBody(event);
    console.log(body);
    await serverAnyTimeInfoSchema.validate(body);

    const foundUser = await User.findOne({ 'info.email': event?.user?.email }, queryFields)
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if(!foundUser.active || !foundUser.verified) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: "Account isn't activated"
      }))
    }

    console.log('foundUSer mf: ', foundUser);

    for(const [key, value] of Object.entries(foundUser.info)) {
      if(body[key] === value || body[key] === '') continue;

      if(foundUser.info[key]) {
        foundUser.info[key] = body[key];
      }
    }

    await foundUser.save();
    
    return {
      message: 'Profile updated successfully'
    };

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
