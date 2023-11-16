import { startSession } from "mongoose";
import User from "~/server/models/User.model"
import Income from "~/server/models/Income.model";
import { serverAdminInfoSchema } from "~/utils/adminInfoSchema";
import verifyAdminOneTimeFields from "~/server/helpers/verifyAdminOneTimeFields";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";


export default eventHandler(async (event) => {
  const adminSelfEditSession = await startSession();
  adminSelfEditSession.startTransaction({
    readConcern: "snapshot",
    writeConcern: {
      w: "majority",
      journal: true
    }
  })

  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const queryFields = {
      info: 1,
      role: 1,
    }

    const body = await readBody(event);
    await serverAdminInfoSchema.validate(body);

    const foundUser = await User.findOne({ 'info.email': event?.user?.email })
      .session(adminSelfEditSession)
      .select(queryFields);

    if (!foundUser) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    if (foundUser.info.email !== event?.user?.email) {
      return sendError(event, createError({
        statusCode: 403,
        statusMessage: 'Unauthorized'
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
          statusMessage: err?.message || 'Something went wrong'
        }))
      })
    }

    // duplicate email check
    if (
      body?.email !== foundUser.info.email
      &&
      await User.exists({ 'info.email': body?.email }).session(adminSelfEditSession)
    ) {
      return sendError(event, createError({
        statusCode: 409,
        statusMessage: "The email you are trying to set is invalid, try again"
      }))
    }

    // if same email dont change income profile's email
    if (body?.email !== foundUser.info.email) {
      const foundIncomeProfile = await Income.findOne({ email: foundUser?.info?.email })
        .session(adminSelfEditSession);
      if (!foundIncomeProfile) {
        return sendError(event, createError({
          statusCode: 404,
          statusMessage: 'User income profile not found'
        }))
      }

      foundIncomeProfile.email = body.email;
      await foundIncomeProfile.save({ session: adminSelfEditSession });
    }


    for (const [key, value] of Object.entries(foundUser.info)) {
      if (body[key] === value) continue;

      if (key in foundUser.info) {
        foundUser.info[key] = body[key] === "" ? null : body[key];
      }
    }
    await foundUser.save({ session: adminSelfEditSession });

    await adminSelfEditSession.commitTransaction();

    return {
      message: 'Profile updated successfully'
    };

  } catch (err) {
    await adminSelfEditSession.abortTransaction();

    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
    //
  } finally {
    await adminSelfEditSession.endSession();
  }
})
