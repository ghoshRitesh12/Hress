import User from "~/server/models/User.model";
import { signJwt } from "~/server/config/jwt";
import { sendEmail } from "~/server/config/email";
import { genVerifyCodeSchema } from "~/utils/pwdResetSchemas";

export default eventHandler(async function (event) {
  try {
    const body = await readBody(event);

    await genVerifyCodeSchema.validate(body).catch(() => {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid payload",
      })
    })

    const foundUser = await User.findOne({ "info.email": body?.email })
      .readConcern("majority")
      .select({ _id: 1, "info.email": 1 })
      .lean();

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found",
      }))
    }
    const config = useRuntimeConfig(event);

    const signedToken = await signJwt(
      { _userId: `${foundUser._id}` },
      config.PWD_RESET_JWT_SECRET,
      "30m",
      config.PWD_RESET_CRYPTO_SECRET,
    )

    const verifyUrl = `${config.auth.origin}/verifycode?t=${signedToken}`
    await sendEmail({
      receiver: foundUser?.info?.email,
      emailSubject: "Hress Account Recovery",
      emailHTML: `
        <div 
          style="
          font-family: sans-serif; background-color: #333; 
          max-width: fit-content; padding: 32px; color: #eee; 
          border-radius: 16px; word-wrap: break-word; font-weight: 400;
          "
        >
          <h1>
            Hello 
            <span style="color: #8DF894;">
              ${foundUser?.info?.email}
            </span>
            👋
          </h1>
          <h2>
            Please click the link below to recover 
            your Hress login credentials.
          </h2>
          <br/>
          <a 
            href="${verifyUrl}" 
            style="
              background-color: #8DF894; color: #222222;
              padding: 10px 16px; font-weight: 600;
              border-radius: 8px; text-decoration: none;
            "
          >
            RESUME RECOVERY
          </a>

          <br/><br/>
          
          <h3>
            If you are not trying to recover your Hress login credentials, 
            please ignore this email. It is possible that another user entered 
            their login information incorrectly.
            
            <br/><br/>

            <div
              style="
                border-left: 4px solid #8DF894;
                padding: 0 0 0 10px;
              "
            >
              Thank you,
              <br/>
              Hress Trading Corporation
            </div>
          </h3>
        </div>
      `
    })

    return {
      message: "Password reset link has been sent to your email",
    };

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong",
    }))
  }
})
