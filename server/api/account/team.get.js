import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = [
      'ancestors', 'levels', 'active'
    ];
    const res = { 
      sponsorer: null, levels: [],
      userActive: false
    }

    const foundUser = await User.findOne({ 'info.email': event?.user?.email }, queryFields)
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    res.userActive = foundUser.active
    if(!res.userActive) return res;

    res.levels = (await foundUser.populate({ 
      path: 'levels.referrals.userRef',
      select: ['info.name', 'rank'],
    })).levels

    res.sponsorer = (await foundUser.populate({ 
      path: 'ancestors',
      select: ['info.name', 'referralId'] 
    })).ancestors.at(-1) || null


    setResponseStatus(event, 200)
    return res

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    }))
  }
})
