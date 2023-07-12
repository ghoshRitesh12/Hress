import User from "~/server/models/User.model"
import { serverAdminInfoSchema } from "~/utils/adminInfoSchema";
import verifyAdminOneTimeFields from "~/server/helpers/verifyAdminOneTimeFields";
import { serverSearchProfileSchema } from "~/utils/searchProfileSchema";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const paramReferralId = event?.context?.params?.referralId;
    await serverSearchProfileSchema.validate({
      referralId: paramReferralId
    }).catch(() => {
      throw createError({
        statusCode: 400,
        statusMessage: 'Referral id required',
      })
    })

    const queryFields = ['info', 'role'];
    
    const body = await readBody(event);
    console.log('body', body);
    await serverAdminInfoSchema.validate(body);

    const foundUser = await User.findOne({ referralId: paramReferralId }, queryFields);
    if(!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }
    
    if(body.pancardNo || body.bankAccountNo || body.ifsc) {
      await verifyAdminOneTimeFields(
        {
          pancardNo: body.pancardNo || null,
          bankAccountNo: body.bankAccountNo || null,
          ifsc: body.ifsc || null
        },
        foundUser._id
      ).catch((err) => {  
        throw sendError(event, createError({
          statusCode: 400,
          statusMessage: err.message || 'Something went wrong'
        }))
      })
    }

    for(const [key, value] of Object.entries(foundUser.info)) {
      if(body[key] === value || body[key] === '') continue;

      if(key in foundUser.info) {
        foundUser.info[key] = body[key];
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
