import User from "~/server/models/User.model";
import ActiveToken from "~/server/models/ActiveToken.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const queryFields = ['info.name', 'referralId'];

    const body = await readBody(event);
    if (typeof body?.quantity !== 'number') {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid payload"
      }))
    }

    const foundUser = await User.findOne({ 'info.email': event?.user?.email }, queryFields)
      .readConcern('majority')
      .lean();
    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found"
      }))
    }

    if (body.quantity <= 0) {
      return {
        message: "Quantity must be 1 or more"
      };
    }

    const quantity = body.quantity > 30 ? 30 : body.quantity;
    const newActiveTokens = [];
    for (let i = 0; i < quantity; i++) {
      newActiveTokens.push({
        issuedBy: `${foundUser._id}`
      })
    }

    await ActiveToken.insertMany(
      newActiveTokens,
      { ordered: true }
    ).catch(() => {
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: "Couldn't generate new tokens, try again",
      }))
    });

    return {
      message: `Generated ${body.quantity} active token(s)`,
    }

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
