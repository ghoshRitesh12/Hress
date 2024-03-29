import { Types } from "mongoose";
import User from "~/server/models/User.model";
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

    const next_crsr = decodeURIComponent(getQuery(event)?.next_crsr);
    const isValidCursor = Types.ObjectId.isValid(next_crsr);

    if (next_crsr !== 'undefined' && isValidCursor === false) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid query param payload"
      }))
    }

    const pageSize = 20;
    const levelNumberParam = Number(event?.context?.params?.level);
    const levelNumber = (isNaN(levelNumberParam) || levelNumberParam <= 0) ? 0 : levelNumberParam - 1;

    const foundUser = await User.aggregate([
      {
        $match: {
          referralId: paramReferralId
        }
      },
      {
        $project: {
          'info.name': 1,
          referralId: 1,
          userActive: "$active",
          level: {
            $arrayElemAt: ["$levels", levelNumber],
          },
        }
      },
      {
        $addFields: {
          "paginatedReferrals": {
            $filter: {
              input: "$level.referrals",
              as: "referral",
              limit: pageSize,
              cond: isValidCursor ? {
                $gt: [
                  "$$referral._id",
                  new Types.ObjectId(next_crsr)
                ]
              } : true,
            }
          },
          levelNo: "$level.levelNo",
        }
      },
      {
        $addFields: {
          lastPaginatedReferral: {
            $cond: {
              if: { $ne: [{ $size: "$paginatedReferrals" }, 0] },
              then: { $arrayElemAt: ["$paginatedReferrals", -1] },
              else: null
            }
          },
        }
      },
      {
        $lookup: {
          from: "Users",
          foreignField: "_id",
          localField: "paginatedReferrals.userRef",
          as: "referrals",
          let: { referrals: "$paginatedReferrals" },
          pipeline: [
            {
              $addFields: {
                parentReference: {
                  $arrayElemAt: [
                    "$$referrals",
                    {
                      $indexOfArray: [
                        "$$referrals.userRef",
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
                rank: 1,
                active: 1,
                referralId: 1,
                'info.name': 1,
                crsr: "$parentReference._id",
                commission: "$parentReference.commission",
              }
            }
          ]
        }
      },
      {
        $project: !isValidCursor ? {
          // paginatedReferrals: 1,
          // lastPaginatedReferral: 1,
          // level: 1,
          _id: 0,
          levelNo: 1,
          referrals: 1,
          hasMore: {
            $anyElementTrue: {
              $map: {
                input: "$level.referrals",
                as: "referral",
                in: {
                  $and: [
                    { $gt: ["$$referral._id", "$lastPaginatedReferral._id"] },
                    { $ne: ["$lastPaginatedReferral", null] }
                  ]
                }
              }
            }
          },
          totalReferrals: { $size: "$level.referrals" },
        } : {
          _id: 0,
          referrals: 1,
          hasMore: {
            $anyElementTrue: {
              $map: {
                input: "$level.referrals",
                as: "referral",
                in: {
                  $and: [
                    { $gt: ["$$referral._id", "$lastPaginatedReferral._id"] },
                    { $ne: ["$lastPaginatedReferral", null] }
                  ]
                }
              }
            }
          },
        }
      },
    ]).readConcern("majority");

    return foundUser?.[0] ?? {};

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'Something Went Wrong',
    }))
  }
})
