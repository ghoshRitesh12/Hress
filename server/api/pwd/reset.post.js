import User from "~/server/models/User.model";
import { hash } from "bcrypt";
import { serverPwdResetSchema } from "~/utils/pwdResetSchemas";

export default eventHandler(async function (event) {
  try {
    const body = await readBody(event);
    await serverPwdResetSchema.validate(body).catch(() => {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid request, try again"
      })
    })

    const foundUser = await User.findById(body?.userId)
      .readConcern("majority")
      .select({ password: 1 });

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found",
      }))
    }

    foundUser.password = await hash(
      body.newPassword,
      parseInt(useRuntimeConfig().PWD_SALT)
    );
    await foundUser.save();

    return {
      message: "Your password has been changed, login to view changes"
    }

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
