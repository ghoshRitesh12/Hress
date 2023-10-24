import { Types } from "mongoose";
import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";


export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const next_crsr = decodeURIComponent(getQuery(event)?.next_crsr);
    const isValidCursor = Types.ObjectId.isValid(next_crsr);

    if (next_crsr !== 'undefined' && isValidCursor === false) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: "Invalid query param payload"
      }))
    }

    const pageSize = 2;
    const levelNumberParam = Number(event?.context?.params?.level);
    const levelNumber = (isNaN(levelNumberParam) || levelNumberParam <= 0) ? 0 : levelNumberParam - 1;

    const start = performance.now();
    const foundUser = await User.aggregate([
      {
        $match: {
          'info.email': event?.user?.email,
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
          level: 1,
          // paginatedReferrals: 1,
          // lastPaginatedReferral: 1,

          _id: 0,
          levelNo: 1,
          referrals: 1,
          // hasMore: {
          //   $arrayElemAt: [
          //     "$level.referrals",
          //     {
          //       $indexOfArray: [
          //         "$level.referrals",
          //         {
          //           $and: [
          //             { $gt: ["$level.referrals._id", "$lastPaginatedReferral._id"] },
          //             { $ne: ["$lastPaginatedReferral", null] }
          //           ]
          //         }
          //       ]
          //     }
          //   ]
          // },
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
          // hasMore: {
          //   $arrayElemAt: [
          //     "$level.referrals",
          //     {
          //       $indexOfArray: [
          //         "$level.referrals",
          //         {
          //           $gt: ["$level.referrals._id", "$lastPaginatedReferral._id"]
          //         }
          //       ]
          //     }
          //   ]
          // },
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
    console.log(performance.now() - start)

    return foundUser?.[0] ?? {};

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Something Went Wrong"
    }))
  }
})