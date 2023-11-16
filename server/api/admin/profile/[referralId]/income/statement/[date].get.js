import Income from "~/server/models/Income.model";
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

    const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
    const dateParam = decodeURIComponent(event?.context?.params?.date);

    if (!dateParam || !dateRegex.test(dateParam)) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid path params payload"
      }))
    }

    const foundIncomeStatement = await Income.aggregate([
      {
        $match: {
          referralId: paramReferralId,
        }
      },
      {
        $project: {
          _id: 0,
          incomeStatement: {
            $ifNull: [
              `$incomes.${dateParam}`,
              []
            ]
          },
        }
      }
    ]).readConcern("majority");


    if (!foundIncomeStatement || foundIncomeStatement?.length === 0) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User income statement not found",
      }))
    }

    setResponseStatus(event, 200);
    return foundIncomeStatement?.[0] ?? {};

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong"
    }))
  }
})