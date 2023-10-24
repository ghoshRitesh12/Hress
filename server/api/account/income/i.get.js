import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";
import getBiMonthlyCTO from "~/server/helpers/cto";
import Income from "~/server/models/Income.model";
import { startSession } from "mongoose";
import Expenditure from "~/server/models/Expenditure.model";


// 1. findout bi-monthly cto
// 2. calculate carFund
// 3. aggregate all users who are eligible for income,
//    finding out their totalLevelIncome and carFund
// 4. Merge the results into "Income" collection ->bulkWrite in batches
// 5. Make this bi-monthly expenditure statement in "Expenditure" model ->bulkWrite in batches  

export default eventHandler(async (event) => {
  const payoutSession = await startSession();
  payoutSession.startTransaction({
    readConcern: "snapshot",
    writeConcern: {
      w: "majority",
      journal: true
    }
  })

  try {
    await nativeAuthenticate(event);
    const maxIncomeLevel = 15;
    // const urs = await User.find();
    // for await (const u of urs) {
    //   await Income.create({
    //     email: u.info.email,
    //     referralId: u.referralId,
    //     userProfile: u._id
    //   })
    // }
    // return 'bruh';


    const carFundIncentive = 3; // 3% of C.T.O
    const carFundMinEligibilityRank = 7; // 7
    const carFundMaxEligibilityRank = 12; // 12

    // const start = performance.now();

    const biMonthlyCTO = await getBiMonthlyCTO(15, 10, 2023);
    const totalEligibleUsers = await User.aggregate([
      {
        $match: {
          rank: {
            $gte: carFundMinEligibilityRank,
            $lte: carFundMaxEligibilityRank
          },
          active: { $eq: true }
        }
      },
      {
        $project: {
          _id: 1
        }
      },
      {
        $count: "frequency"
      }
    ]).readConcern('majority');
    const frequency = totalEligibleUsers?.[0]?.frequency ?? 1;
    const carFund = (((carFundIncentive / 100)) * biMonthlyCTO) / frequency;

    console.log(biMonthlyCTO, carFund);

    const d = new Date();
    // TODO: modify incomePeriod `getDate` ternary condition
    // const incomePeriod = `${d.getDate() <= 15 ? 15 : 30}-${d.getMonth() + 1}-${d.getFullYear()}`
    const incomePeriod = `${15}-${d.getMonth() + 1}-${d.getFullYear()}`

    // const t = await Income.bulkWrite([
    //   {
    //     updateOne: {
    //       filter: {
    //         referralId: "25561de5e4"
    //       },
    //       update: {
    //         [`incomes.12-29-2000`]: [2001, 2]
    //       }
    //     }
    //   }
    // ])

    // return t;

    // const e = await Expenditure.create({
    //   month: incomePeriod,
    //   name: "October's 1st Expenditure statement",
    // })
    // return e;

    // const payeeIncomeAggregation = User.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { 'levels.referrals.createdAt': incomePeriod },
    //         { 'rank': { $gte: carFundMinEligibilityRank } }
    //       ]
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       rank: 1,
    //       'info.name': 1,
    //       referralId: 1,
    //       levels: {
    //         $map: {
    //           input: "$levels",
    //           as: "level",
    //           in: {
    //             referrals: {
    //               $filter: {
    //                 input: "$$level.referrals",
    //                 as: "referral",
    //                 cond: {
    //                   $and: [
    //                     { $gt: ["$$referral.commission", 0] },
    //                     { $eq: ["$$referral.createdAt", incomePeriod] }
    //                   ]
    //                 }
    //               }
    //             }
    //           },

    //         }
    //       },
    //     }
    //   },
    //   {
    //     $unwind: "$levels"
    //   },
    //   {
    //     $unwind: {
    //       path: "$levels.referrals",
    //       preserveNullAndEmptyArrays: true
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       rank: { $first: "$rank" },
    //       fullname: { $first: "$info.name" },
    //       referralId: { $first: "$referralId" },
    //       levels: {
    //         $push: "$levels"
    //       },
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "Users",
    //       foreignField: "_id",
    //       localField: "levels.referrals.userRef",
    //       as: "allReferrals",
    //       let: {
    //         levelReferrals: { // all referrals unwinded as levels
    //           $filter: {
    //             input: "$levels",
    //             as: "item",
    //             cond: {
    //               $gt: [
    //                 {
    //                   $size: { $objectToArray: "$$item" }
    //                 },
    //                 0
    //               ]
    //             }
    //           }
    //         }
    //       },
    //       pipeline: [
    //         {
    //           $match: {
    //             $expr: {
    //               $eq: ["$active", true]
    //             }
    //           }
    //         },
    //         {
    //           $addFields: {
    //             parentReference: {
    //               $arrayElemAt: [
    //                 "$$levelReferrals",
    //                 {
    //                   $indexOfArray: [
    //                     "$$levelReferrals.referrals.userRef", // all referrals unwinded as levels
    //                     "$_id",
    //                   ]
    //                 }
    //               ]
    //             }
    //           }
    //         },
    //         {
    //           $project: {
    //             // _id: 1,
    //             // o: "$$levelReferrals",
    //             // parentReference: 1,
    //             // pID: "$parentReference.referrals.userRef",
    //             referralId: 1,
    //             courseType: 1,
    //             commission: "$parentReference.referrals.commission"
    //           }
    //         },
    //       ]

    //     }
    //   },
    //   // {
    //   //   $addFields: {
    //   //     allReferrals: {
    //   //       $map: {
    //   //         input: "$refs",
    //   //         as: "referral",
    //   //         in: {
    //   //           $mergeObjects: [
    //   //             "$$referral",
    //   //             {
    //   //               $arrayElemAt: [
    //   //                 "$levels.referrals",
    //   //                 {
    //   //                   $indexOfArray: [
    //   //                     "$levels.referrals.userRef",
    //   //                     "$$referral._id",
    //   //                   ]
    //   //                 }
    //   //               ]
    //   //             }
    //   //           ]
    //   //         }
    //   //       }
    //   //     }
    //   //   }
    //   // },
    //   {
    //     $addFields: {
    //       allLevelIncome: {
    //         $map: {
    //           input: "$allReferrals",
    //           as: "referral",
    //           in: {
    //             $let: {
    //               vars: {
    //                 joiningFees: {
    //                   $cond: {
    //                     if: { $eq: ["$$referral.courseType", "advance"] },
    //                     then: 20000,
    //                     else: {
    //                       $cond: {
    //                         if: { $eq: ["$$referral.courseType", "basic"] },
    //                         then: 12000,
    //                         else: 0
    //                       }
    //                     }
    //                   }
    //                 },
    //                 commission: "$$referral.commission",
    //                 referralIncome: 0,
    //               },
    //               in: {
    //                 $cond: [
    //                   { $gt: ['$$commission', 20] },
    //                   {
    //                     $let: {
    //                       vars: {
    //                         levelCommission: { $subtract: ['$$commission', 20] },
    //                         spilloverCommission: 20,
    //                         totalCommission: {
    //                           $add: [
    //                             {
    //                               $multiply: [
    //                                 '$$joiningFees',
    //                                 0.2
    //                               ]
    //                             },
    //                             {
    //                               $multiply: [
    //                                 '$$joiningFees',
    //                                 {
    //                                   $divide: [
    //                                     { $subtract: ['$$commission', 20] }, // level commission
    //                                     100
    //                                   ]
    //                                 }
    //                               ]
    //                             }
    //                           ]
    //                         }
    //                       },
    //                       in: {
    //                         referralIncome: { $add: ['$$referralIncome', '$$totalCommission'] }
    //                       }
    //                     }
    //                   },
    //                   {
    //                     referralIncome: { $add: ['$$referralIncome', { $multiply: ['$$joiningFees', { $divide: ['$$commission', 100] }] }] }
    //                   }
    //                 ]
    //               }
    //             }
    //           }
    //         }
    //       },
    //     }
    //   },
    //   {
    //     $addFields: {
    //       totalLevelIncome: {
    //         $sum: "$allLevelIncome.referralIncome"
    //       },
    //       carFund: {
    //         $cond: {
    //           if: {
    //             $and: [
    //               { $gte: ["$rank", carFundMinEligibilityRank] },
    //               { $lt: ["$rank", carFundMaxEligibilityRank] },
    //             ]
    //           },
    //           then: carFund,
    //           else: 0
    //         }
    //       },
    //     }
    //   },
    //   {
    //     $match: {
    //       $or: [
    //         { totalLevelIncome: { $gt: 0 } },
    //         { carFund: { $gt: 0 } }
    //       ]
    //     }
    //   },
    //   {
    //     $addFields: {
    //       updateOne: {
    //         filter: {
    //           referralId: "$referralId"
    //         },
    //         update: {
    //           [`incomes@${incomePeriod}`]: ["$totalLevelIncome", "$carFund"]
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $addFields: {
    //       "updateOne.update": {
    //         $map: {
    //           input: { $objectToArray: "$updateOne.update" },
    //           as: "updateField",
    //           in: {
    //             k: {
    //               $replaceAll: {
    //                 input: "$$updateField.k",
    //                 find: "@",
    //                 replacement: "."
    //               }
    //             },
    //             v: "$$updateField.v"
    //           }
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $addFields: {
    //       "updateOne.update": { $arrayToObject: "$updateOne.update" }
    //     }
    //   },
    //   // {
    //   //   $sort: {
    //   //     _id: 1
    //   //   }
    //   // },
    //   {
    //     $project: {
    //       _id: 0,
    //       updateOne: 1,
    //       updateOnes: 1,
    //     }
    //   },
    //   // {
    //   //   $project: {
    //   //     // allLevelIncome: 1,
    //   //     // allReferrals: 0,
    //   //     _id: 0,
    //   //     "Full Name": "$fullname",
    //   //     "Referral Id": "$referralId",
    //   //     "Level Income": "$totalLevelIncome",
    //   //     "Car Fund": "$carFund",
    //   //   }
    //   // }
    // ]).session(payoutSession).cursor();

    // function sleep(ms) {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(resolve, ms)
    //   })
    // }

    // const batchSize = 6;
    // let allBW = [];
    // await payeeIncomeAggregation.eachAsync(async (doc, i) => {
    //   try {
    //     // await sleep(3000)
    //     // console.log("index: ", i, " doc: ", doc);
    //     let BW = await Income.bulkWrite(doc, { session: payoutSession })
    //     allBW.push(BW);
    //   } catch (err) {
    //     throw err
    //   }
    // }, {
    //   parallel: batchSize,
    //   batchSize: batchSize,
    //   continueOnError: false
    // })


    // await payoutSession.commitTransaction();

    await Expenditure.updateOne(
      { month: incomePeriod },
      {
        $push: {
          payees: {

          }
        }
      },
      {}
    )

    const expenditureStatementAggregation = await Income.aggregate([
      {
        $match: {
          [`incomes.${incomePeriod}`]: { $exists: true }
        }
      },
      {
        $project: {
          statement: {
            userRef: "$userProfile",
            income: `$incomes.${incomePeriod}`
          }
        }
      },
      // {
      //   $group: {
      //     _id: null,
      //     payees: {
      //       $push: "$statement"
      //     }
      //   }
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     payees: 1,
      //     month: incomePeriod,
      //   }
      // },
    ]).readConcern("majority");

    // **run for eachAsync batch of individual income statements, 
    // **for each batch do perform updateOne(), use the $push operator
    // **along with the $each operator to push and spread batched array elements

    return expenditureStatementAggregation;
    // if (!foundUser || foundUser?.length === 0) {
    //   return sendError(event, createError({
    //     statusCode: 404,
    //     statusMessage: 'User not found'
    //   }))
    // }

    // setResponseStatus(event, 200)
    // return foundUser?.[0] ?? {};

  } catch (err) {
    await payoutSession.abortTransaction();
    console.log(err);
    return sendError(event, createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || "Something Went Wrong"
    }))
  } finally {
    await payoutSession.endSession();
  }
})