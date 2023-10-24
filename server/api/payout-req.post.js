import { hash } from "bcrypt";
import { startSession } from "mongoose";
import Expenditure from "../models/Expenditure.model";
import { nativeAuthenticate, nativeAuthorize } from "../helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  await nativeAuthenticate(event);
  nativeAuthorize(event);

  const payoutReqSession = await startSession();
  payoutReqSession.startTransaction({
    readConcern: "snapshot",
    writeConcern: {
      w: "majority",
      journal: true
    }
  })

  try {
    const body = await readBody(event);
    const config = useRuntimeConfig();

    if (isNaN(Number(body?.timestamp)) || (typeof body?.timestamp !== 'number')) {
      await payoutReqSession.abortTransaction();
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid payload",
      }))
    }

    const d = new Date(body?.timestamp);
    const incomePeriod = `${d.getDate() <= 15 ? 15 : 30}-${d.getMonth() + 1}-${d.getFullYear()}`
    const expenditureName = `${d.toLocaleString('default', { month: 'long' })}'s `
      + `${d.getDate() <= 15 ? '1st' : '2nd'} expenditure statement`

    const newExpenditure = await Expenditure.create(
      [{
        name: expenditureName,
        month: incomePeriod,
      }],
      { session: payoutReqSession }
    )

    const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
    const newExpenditureMonth = newExpenditure?.[0]?.month;
    if (!newExpenditure || !dateRegex.test(newExpenditureMonth)) {
      throw createError();
    }

    const hashedKey = encodeURIComponent(await hash(config.HRESS_SERVICE_SECRET, 10))
    const data = await $fetch(
      `${config.HRESS_SERVICE_DOMAIN}/payout/${hashedKey}`,
      {
        headers: {
          'X-Parent-Service-Domain': config.public.siteUrl,
        },
        method: 'POST',
        body: {
          incomePeriod: newExpenditureMonth
        }
      }
    );

    await payoutReqSession.commitTransaction();

    return {
      message: data.msg
    }

  } catch (err) {
    await payoutReqSession.abortTransaction();
    console.error(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: "Payout generation failed, try again later",
    }))

  } finally {
    await payoutReqSession.endSession();
  }
})