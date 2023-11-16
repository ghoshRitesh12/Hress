import { startSession } from "mongoose";
import User from "~/server/models/User.model"
import Income from "~/server/models/Income.model";
import { serverAdminInfoSchema } from "~/utils/adminInfoSchema";
import verifyAdminOneTimeFields from "~/server/helpers/verifyAdminOneTimeFields";
import { serverSearchProfileSchema } from "~/utils/searchProfileSchema";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  const adminEditSession = await startSession();
  adminEditSession.startTransaction({
    readConcern: "snapshot",
    writeConcern: {
      w: "majority",
      journal: true
    }
  })

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

    const queryFields = {
      info: 1,
      role: 1,
    }

    const body = await readBody(event);
    await serverAdminInfoSchema.validate(body);

    const foundUser = await User.findOne({ referralId: paramReferralId })
      .session(adminEditSession)
      .select(queryFields);

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if (body?.pancardNo || body?.bankAccountNo || body?.ifsc) {
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

    // duplicate email check
    if (
      body?.email !== foundUser.info.email
      &&
      await User.exists({ 'info.email': body?.email }).session(adminEditSession)
    ) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "The email you are trying to set is invalid, try again"
      }))
    }

    // if same email dont change income profile's email
    if (body?.email !== foundUser.info.email) {
      const foundIncomeProfile = await Income.findOne({ email: foundUser?.info?.email })
        .session(adminEditSession);
      if (!foundIncomeProfile) {
        return sendError(event, createError({
          statusCode: 404,
          statusMessage: 'User income profile not found'
        }))
      }

      foundIncomeProfile.email = body.email;
      await foundIncomeProfile.save({ session: adminEditSession });
    }


    for (const [key, value] of Object.entries(foundUser.info)) {
      if (body[key] === value) continue;

      if (key in foundUser.info) {
        foundUser.info[key] = body[key] === "" ? null : body[key];
      }
    }

    await foundUser.save({ session: adminEditSession });

    await adminEditSession.commitTransaction();

    return {
      message: 'Profile updated successfully'
    };

  } catch (err) {
    await adminEditSession.abortTransaction();

    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  } finally {
    await adminEditSession.endSession();
  }
})
