import { Types } from "mongoose";
import Expenditure from "~/server/models/Expenditure.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);
    nativeAuthorize(event)

    const next_crsr = decodeURIComponent(getQuery(event)?.next_crsr);
    const isValidCursor = Types.ObjectId.isValid(next_crsr);

    if (next_crsr !== 'undefined' && isValidCursor === false) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid query params payload"
      }))
    }

    const pageSize = 4;
    const dateRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
    const dateParam = decodeURIComponent(event?.context?.params?.date);

    if (!dateParam || !dateRegex.test(dateParam)) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid path params payload"
      }))
    }

    const expenditures = await Expenditure.aggregate([
      {
        $match: {
          month: dateParam
        }
      },
      {
        $addFields: {
          payees: {
            $sortArray: {
              input: "$payees",
              sortBy: { _id: 1 }
            }
          }
        }
      },
      {
        $addFields: {
          paginatedPayees: {
            $filter: {
              input: "$payees",
              as: "payee",
              limit: pageSize,
              cond: isValidCursor ? {
                $gt: [
                  "$$payee._id",
                  new Types.ObjectId(next_crsr)
                ]
              } : true,
            }
          },
        }
      },
      {
        $addFields: {
          lastPaginatedPayee: {
            $cond: {
              if: { $ne: [{ $size: "$paginatedPayees" }, 0] },
              then: { $arrayElemAt: ["$paginatedPayees", -1] },
              else: null
            }
          },
        }
      },
      {
        $lookup: {
          from: "Users",
          foreignField: "_id",
          localField: "paginatedPayees.userRef",
          as: "populatedPayees",
          let: { paginatedPayees: "$paginatedPayees" },
          pipeline: [
            {
              $addFields: {
                parentReference: {
                  $arrayElemAt: [
                    "$$paginatedPayees",
                    {
                      $indexOfArray: [
                        "$$paginatedPayees.userRef",
                        "$_id",
                      ]
                    }
                  ]
                }
              }
            },
            {
              $project: {
                _id: 0,
                name: "$info.name",
                email: "$info.email",
                bankAccountNo: "$info.bankAccountNo",
                ifsc: "$info.ifsc",
                income: "$parentReference.income",
                crsr: "$parentReference._id",
              }
            }
          ]
        }
      },
      {
        $project: {
          // payees: "$payees",
          // paginatedPayees: 1,
          // paginatedPayees: "$populatedPayees",

          _id: 0,
          statementMonth: dateParam,
          paginatedPayees: {
            $sortArray: {
              input: "$populatedPayees",
              sortBy: { crsr: 1 }
            }
          },
          hasMore: {
            $anyElementTrue: {
              $map: {
                input: "$payees",
                as: "payee",
                in: {
                  $and: [
                    { $gt: ["$$payee._id", "$lastPaginatedPayee._id"] },
                    { $ne: ["$lastPaginatedPayee", null] }
                  ]
                }
              }
            }
          }
        }
      }
    ]).readConcern("majority");

    if (!expenditures) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "No bi-monthly expenditure statements found"
      }))
    }

    setResponseStatus(event, 200)
    return expenditures?.[0] ?? {
      paginatedPayees: [],
      statementMonth: dateParam
    };
    // return expenditures;

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong"
    }))
  }
})