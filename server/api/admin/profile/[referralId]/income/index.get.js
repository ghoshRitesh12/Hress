import User from "~/server/models/User.model";
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

    const [incomeLevelOptions, pastIncomeStatements] = await Promise.all([
      User.aggregate([
        {
          $match: {
            referralId: paramReferralId
          }
        },
        {
          $project: {
            _id: 0,
            userActive: "$active",
            selectIncomeLevels: {
              $cond: {
                if: { $eq: ["$active", true] },
                then: {
                  $map: {
                    input: "$levels",
                    as: "level",
                    in: {
                      label: {
                        $concat: [
                          "Level ",
                          { $toString: "$$level.levelNo" }
                        ]
                      },
                      value: "$$level.levelNo"
                    }
                  }
                },
                else: []
              }
            }
          }
        },
      ]).readConcern("majority"),

      Income.aggregate([
        {
          $match: {
            referralId: paramReferralId
          }
        },
        {
          $project: {
            _id: 0,
            pastIncomeStatements: {
              $map: {
                input: { $objectToArray: "$incomes" },
                as: "item",
                in: {
                  $let: {
                    vars: {
                      ogValue: "$$item.k",   //originalValue
                      ogDate: {              //originalDate
                        $dateToParts: {
                          date: { $toDate: "$$item.k" }
                        }
                      },
                      monthsInString: [
                        "January", "February", "March", "April",
                        "May", "June", "July", "August",
                        "September", "October", "November", "December"
                      ]
                    },
                    in: {
                      label: {
                        $concat: [
                          {
                            $cond: {
                              if: { $lte: ["$$ogDate.day", 15] },
                              then: "1st half of",
                              else: "2nd half of"
                            }
                          },
                          " ",
                          {
                            $arrayElemAt: [
                              "$$monthsInString",
                              { $subtract: ["$$ogDate.month", 1] }
                            ]
                          },
                          " ",
                          {
                            $toString: "$$ogDate.year"
                          }
                        ]
                      },
                      value: "$$ogValue",
                    }
                  }
                }
              }
            }
          }
        },
      ]).readConcern("majority"),
    ])

    if (!incomeLevelOptions || incomeLevelOptions?.length === 0) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "Income level options not found"
      }))
    }

    if (!pastIncomeStatements || pastIncomeStatements?.length === 0) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "Past income statements not found"
      }))
    }

    setResponseStatus(event, 200);
    return {
      ...incomeLevelOptions?.[0],
      ...pastIncomeStatements?.[0]
    };

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
