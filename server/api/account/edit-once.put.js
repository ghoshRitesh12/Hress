import User from "~/server/models/User.model"
import { serverOneTimeInfoSchema } from "~/utils/oneTimeInfoSchema";
import verifyOneTimeFields from "~/server/helpers/verifyOneTimeFields";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const queryFields = [
      'info.bankAccountNo', 'info.ifsc',
      'info.pancardNo', 'active', 'verified'
    ];

    const body = await readBody(event);
    console.log(body);
    await serverOneTimeInfoSchema.validate(body);

    const foundUser = await User.findOne({ 'info.email': event?.user?.email }, queryFields)
      .readConcern('majority')
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if(!foundUser.active || !foundUser.verified) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: "Account isn't activated"
      }))
    }

    await verifyOneTimeFields({
      pancardNo: body.pancardNo,
      bankAccountNo: body.bankAccountNo,
      ifsc: body.ifsc
    }).catch((err) => {
      console.log('eee: ', err);

      throw sendError(event, createError({
        statusCode: 400,
        statusMessage: err.message || 'Something went wrong'
      }))
    })

    for(const [key, value] of Object.entries(foundUser.info)) {
      if(value) return sendError(event, createError({
        statusCode: 409,
        statusMessage: 'One time data already present'
      }))

      if(key in body) {
        foundUser.info[key] = body[key]
      }
    }

    await foundUser.save();
    
    return {
      message: 'Profile updated successfully'
    };

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
