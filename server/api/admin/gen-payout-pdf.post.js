import { hash } from "bcrypt";
import Expenditure from "~/server/models/Expenditure.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event);

    const body = await readBody(event);
    const config = useRuntimeConfig(event);

    const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

    if (!body?.incomePeriod || !dateRegex.test(body?.incomePeriod)) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid payload"
      }))
    }

    const foundExpenditure = await Expenditure.findOne({ month: body?.incomePeriod })
      .readConcern("majority")
      .select({ month: 1, })
      .lean();

    if (!foundExpenditure) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "Expenditure record not found",
      }))
    }

    if (!dateRegex.test(foundExpenditure?.month)) {
      throw createError();
    }

    const hashedKey = encodeURIComponent(await hash(config?.HRESS_SERVICE_SECRET, 10))
    const data = await $fetch(
      `${config?.HRESS_SERVICE_DOMAIN}/payout/pdf?key=${hashedKey}`,
      {
        method: "POST",
        headers: {
          "X-Parent-Service-Domain": config?.public?.siteUrl,
        },
        body: {
          incomePeriod: foundExpenditure?.month
        }
      }
    );

    return {
      message: data.msg
    }

  } catch (err) {
    console.error(err);

    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: "Payout generation failed, try again later",
    }))
  }
})
