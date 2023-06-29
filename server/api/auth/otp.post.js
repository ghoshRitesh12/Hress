import Otp from "../../models/Otp.model";
import { sendEmail } from "~/server/config/email";

export default eventHandler(async (event) => {
  try {
    const { emailId, fullname } = await readBody(event);
    if(emailId || !fullname) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Required credentials not found',
      }))
    }

    const tempUser = await Otp.create({ email: emailId });

    await sendEmail({
      receiver: tempUser.email,
      emailSubject: 'Hress Email Verification OTP',
      emailText: `
      Hello ${fullname},

      Thank you for registering with our service. 
      To complete the verification process, please use the following OTP (One-Time Password):

      OTP: ${tempUser.otp}

      Please enter the OTP within ${tempUser.validMins} minutes to verify your email address.
      If you did not initiate this request, please ignore this email.

      Thank you,
      Hress
      `
    })

    setResponseStatus(event, 200);
    return {
      message: 'Verification email sent successfully'
    }

  } catch (err) {
    console.log(err);    
    sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    }))
  }
})
