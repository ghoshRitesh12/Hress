import { hash } from "bcrypt";
import { startSession } from "mongoose";
import Expenditure from "~/server/models/Expenditure.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

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
  });

  try {
    const body = await readBody(event);
    const config = useRuntimeConfig(event);

    const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;

    if (!body?.incomePeriod || !dateRegex.test(body?.incomePeriod)) {
      await payoutReqSession.abortTransaction();
      await payoutReqSession.endSession();

      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid payload"
      }))
    }

    // bi-monthly time period
    let expenditurePeriod = undefined;

    const foundExistingExpenditure = await Expenditure.findOne({ month: body?.incomePeriod })
      .session(payoutReqSession)
      .select({ month: 1, })
      .lean();

    if (foundExistingExpenditure) {
      await Expenditure.bulkWrite([{
        updateOne: {
          filter: {
            month: foundExistingExpenditure.month
          },
          update: {
            $set: {
              payees: []
            }
          }
        }
      }], { session: payoutReqSession })

      expenditurePeriod = foundExistingExpenditure?.month;
      // 
    } else {
      const d = new Date(body?.incomePeriod?.split("-")?.reverse()?.join("-"))
      const expenditureName = `${d?.getDate() <= 15 ? '1st' : '2nd'} half of ${d?.toLocaleString('default', { month: 'long' })} ${d?.getFullYear()}`;

      const newExpenditure = await Expenditure.create(
        [{
          name: expenditureName,
          month: body?.incomePeriod,
        }],
        { session: payoutReqSession }
      )

      expenditurePeriod = newExpenditure?.[0]?.month;
    }

    if (!dateRegex.test(expenditurePeriod)) {
      throw createError();
    }

    const hashedKey = encodeURIComponent(await hash(config?.HRESS_SERVICE_SECRET, 10))
    const data = await $fetch(
      `${config?.HRESS_SERVICE_DOMAIN}/payout?key=${hashedKey}`,
      {
        method: "POST",
        headers: {
          "X-Parent-Service-Domain": config?.public?.siteUrl,
        },
        body: {
          incomePeriod: expenditurePeriod
        }
      }
    );

    await payoutReqSession.commitTransaction();
    await payoutReqSession.endSession();

    return {
      message: data.msg
    }

  } catch (err) {
    await payoutReqSession.abortTransaction();
    await payoutReqSession.endSession();

    console.error(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: "Payout generation failed, try again later",
    }))

  }
})
