import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const userQueryFields = {
      _id: 0,
      pfp: 1,
      info: 1,
      rank: 1,
      active: 1,
      verified: 1,
      courseType: 1,
      referralId: 1,
    };

    const foundUser = await User.findOne({ 'info.email': event?.user?.email })
      .readConcern('majority')
      .select(userQueryFields)
      .lean();

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    setResponseStatus(event, 200)
    return foundUser;

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
