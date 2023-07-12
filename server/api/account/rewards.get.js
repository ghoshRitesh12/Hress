import User from "~/server/models/User.model";
import { getRankRewards } from "~/server/helpers/utils";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = ['rank', 'active'];
    const res = { 
      rank: 1, 
      reward: null,
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

    res.rank = foundUser.rank;
    res.reward = getRankRewards(foundUser.rank);

    return res;
    
  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
