import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const userQueryFields = {
      _id: 0,
      levels: 1,
      active: 1,
      ancestors: 1,
    }

    const res = {
      levels: [],
      sponsorer: null,
      userActive: false
    }
    // return res;
    const teamPopulateFields = ['info.name', 'rank', 'active', 'referralId']

    const foundUser = await User.findOne({ 'info.email': event?.user?.email })
      .readConcern('majority')
      .select(userQueryFields)
      .populate({
        path: 'levels.referrals.userRef',
        select: teamPopulateFields
      }).slice('ancestors', -1)
      .populate({
        path: 'ancestors',
        select: ['info.name', 'referralId']
      })
      .lean();

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    res.userActive = foundUser.active
    if (!res.userActive) return res;

    res.levels = foundUser.levels;
    res.sponsorer = foundUser.ancestors[0];

    setResponseStatus(event, 200)
    return res


  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    }))
  }
})
