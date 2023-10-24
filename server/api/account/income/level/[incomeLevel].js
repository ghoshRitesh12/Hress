import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const d = new Date();
    const incomePeriod = `${d.getDate() <= 15 ? 15 : 30}-${d.getMonth() + 1}-${d.getFullYear()}`

    const incomeLevelParam = Number(event?.context?.params?.incomeLevel);
    const incomeLevel = (isNaN(incomeLevelParam) || incomeLevelParam <= 0) ? 0 : incomeLevelParam - 1;

    const foundUser = await User.aggregate([
      {
        $match: {
          'info.email': event?.user?.email,
        }
      },
      {
        $project: {
          _id: 0,
          'info.name': 1,
          level: {
            $arrayElemAt: ["$levels", incomeLevel],
          },
        }
      },
      {
        $project: {
          'info.name': 1,
          levelNo: "$level.levelNo",
          "level.referrals": {
            $filter: {
              input: "$level.referrals",
              as: "referral",
              cond: {
                $and: [
                  { $gt: ["$$referral.commission", 0] },
                  { $eq: ["$$referral.createdAt", incomePeriod] }
                ]
              }
            }
          },
          levelMembers: {
            $cond: {
              if: { $isArray: "$level.referrals" },
              then: { $size: "$level.referrals" },
              else: 0
            }
          }
        }
      },
      {
        $lookup: {
          from: "Users",
          foreignField: "_id",
          localField: "level.referrals.userRef",
          as: "refs",
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$active", true]
                }
              }
            },
            {
              $project: {
                _id: 1,
                "info.id": 1,
                "info.name": 1,
                courseType: 1,
              }
            }
          ]
        }
      },
      {
        $addFields: {
          "level.referrals": {
            $map: {
              input: "$refs",
              as: "referral",
              in: {
                $mergeObjects: [
                  "$$referral",
                  {
                    $arrayElemAt: [
                      "$level.referrals",
                      {
                        $indexOfArray: [
                          "$level.referrals.userRef",
                          "$$referral._id",
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      {
        $addFields: {
          levelIncome: {
            $map: {
              input: "$level.referrals",
              as: "referral",
              in: {
                $let: {
                  vars: {
                    joiningFees: {
                      $cond: {
                        if: { $eq: ["$$referral.courseType", "advance"] },
                        then: 20000,
                        else: {
                          $cond: {
                            if: { $eq: ["$$referral.courseType", "basic"] },
                            then: 12000,
                            else: 0
                          }
                        }
                      }
                    },
                    commission: "$$referral.commission",
                    referralIncome: 0,
                  },
                  in: {
                    $cond: [
                      { $gt: ['$$commission', 20] },
                      {
                        $let: {
                          vars: {
                            levelCommission: { $subtract: ['$$commission', 20] },
                            spilloverCommission: 20,
                            totalCommission: {
                              $add: [
                                {
                                  $multiply: [
                                    '$$joiningFees',
                                    0.2
                                  ]
                                },
                                {
                                  $multiply: [
                                    '$$joiningFees',
                                    {
                                      $divide: [
                                        { $subtract: ['$$commission', 20] }, // level commission
                                        100
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          },
                          in: {
                            referralIncome: { $add: ['$$referralIncome', '$$totalCommission'] }
                          }
                        }
                      },
                      {
                        referralIncome: { $add: ['$$referralIncome', { $multiply: ['$$joiningFees', { $divide: ['$$commission', 100] }] }] }
                      }
                    ]
                  }
                }
              }
            }
          },
        }
      },
      {
        $project: {
          // 'info.name': 1,
          // referralId: 1,
          // level: 1,
          // refs: 1,
          // levelIncome: 1,
          levelNo: 1,
          levelMembers: 1,
          levelIncome: {
            $sum: "$levelIncome.referralIncome"
          }
        }
      },
    ]).readConcern("majority");


    if (!foundUser || foundUser?.length === 0) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    // res.userActive = foundUser.active
    // if (!res.userActive) return res;

    // for (const level of foundUser.levels) {
    // let levelIncome = 0;

    // for (const referral of foundUser?.level?.referrals) {
    //   // if (!referral?.userRef?.active || referral.commission <= 0) continue;

    //   const joiningFees = (
    //     referral.userRef.courseType === 'advance' ?
    //       20000 :
    //       (referral.userRef.courseType === 'basic' ? 12000 : 0)
    //   );

    //   if (referral.commission > 20) {
    //     const levelCommission = referral.commission - 20;
    //     const spilloverCommission = referral.commission - levelCommission;
    //     const totalCommission = (joiningFees * (spilloverCommission / 100)) + (joiningFees * (levelCommission / 100))

    //     levelIncome += totalCommission
    //     continue;
    //   }

    //   levelIncome += (joiningFees * (referral.commission / 100))
    // }

    // res.totalLevelIncome += levelIncome
    // res.levels.push({
    //   levelNo: level.levelNo,
    //   levelMembers: level.referrals.length,
    //   levelIncome
    // })
    // }

    setResponseStatus(event, 200)
    return foundUser?.[0] ?? {};

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong"
    }))
  }
})