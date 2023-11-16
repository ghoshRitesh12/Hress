import User from "~/server/models/User.model";
import { verifyJwt } from "~/server/config/jwt";

export default eventHandler(async function (event) {
  try {
    const queryParams = getQuery(event);
    const config = useRuntimeConfig(event);

    const decodedPayload = await verifyJwt(
      queryParams?.token,
      config.PWD_RESET_JWT_SECRET,
      config.PWD_RESET_CRYPTO_SECRET
    ).catch(() => {
      throw createError({
        statusCode: 403,
        statusMessage: "Account recovery link is invalid, try again"
      })
    })

    const foundUser = await User.findById(decodedPayload?._userId)
      .readConcern("majority")
      .select({ _id: 1 })
      .lean();

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found",
      }))
    }

    return {
      id: `${foundUser?._id}`,
    };

  } catch (err) {
    // console.error(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong",
    }))
  }
})
