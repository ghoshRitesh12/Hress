import Expenditure from "~/server/models/Expenditure.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event)

    const expenditures = await Expenditure.aggregate([
      {
        $project: {
          expenditureInfo: {
            label: "$name",
            value: "$month",
          }
        }
      },
      {
        $group: {
          _id: null,
          selectExpenditures: {
            $push: "$expenditureInfo"
          }
        }
      },
    ]).readConcern("majority");

    if (!expenditures) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "No bi-monthly expenditure statements found"
      }))
    }

    setResponseStatus(event, 200)
    return expenditures?.[0] ?? [];

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong"
    }))
  }
})