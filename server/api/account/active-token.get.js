import User from "~/server/models/User.model";
import ActiveToken from "~/server/models/ActiveToken.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const foundUser = await User.findOne({ 'info.email': event?.user?.email }, '_id')
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found"
      }))
    }
    
    const tokenQueryFields = ["usedBy", "token", "issuedAt"];
    const adminActiveTokens = await ActiveToken.find(
      { issuedBy: `${foundUser._id}` }, 
      tokenQueryFields
    ).readConcern('majority');

    return {
      tokens: adminActiveTokens
    }

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
