import User from "~/server/models/User.model";
import { nativeAuthenticate, nativeAuthorize } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  await nativeAuthenticate(event);
  nativeAuthorize(event);

  const teamPopulateFields = ['info.name', 'rank', 'active']
  if (event?.user?.role === 'admin') {
    teamPopulateFields.push('referralId');
  }

  const pageNumber = 1;
  const pageSize = 1;

  // team query check
  const start = performance.now();
  // const foundUser = await User.findOne({ 'info.email': event?.user?.email })
  //   .readConcern("majority")
  //   .select({
  //     _id: 0,
  //     levels: { $arrayElemAt: ["$levels", 0] },
  //     active: 1,
  //     role: 1,
  //     referralId: 1,
  //     'info.name': 1,
  //     "levels.referrals": {
  //       $slice: [(pageNumber - 1) * pageSize, pageSize]
  //     }
  //   })
  // .slice("levels.referrals", [(pageNumber - 1) * pageSize, pageSize])
  // .populate({
  //   path: 'levels.referrals.userRef',
  //   select: teamPopulateFields,
  // })
  // .lean();

  _well_: for (let i = 1; i < 2; ++i) {
    break _well_;
  }

  const foundUser = await User.aggregate([
    {
      $project: {
        'info.email': 1,
        'info.name': 1,
        referralId: 1,
        level: {
          $arrayElemAt: ["$levels", 0]
        },
      }
    },
    {
      $match: {
        'info.email': event?.user?.email
      }
    },
    {
      $project: {
        'info.email': 1,
        'info.name': 1,
        referralId: 1,
        "level.referrals": {
          $slice: ["$level.referrals", (pageNumber - 1) * pageSize, pageSize]
        }
      }
    },
    // {
    //   $unwind: "$level.referrals"
    // },
    {
      $lookup: {
        from: "Users",
        foreignField: "_id",
        localField: "level.referrals.userRef",
        as: "refs",
      }
    },
    // {
    //   $unwind: "$refs"
    // },
    // {
    //   $addFields: {
    //     "level.referrals.userRef": "$refs"
    //   }
    // },
    {
      $project: {
        'info.name': 1,
        referralId: 1,
        "active": 1,
        // "referrals": 1,
        b: 1,

        "level.levelNo": 1,
        "level.referrals._id": 1,
        "level.referrals.commission": 1,
        "level.referrals.userRef": 1,
        // "level.referrals.userRef.info.name": 1,
        // "level.referrals.userRef.referralId": 1,
        "refs._id": 1,
        // "refs.commission": 1,
        "refs.info.name": 1,
        "refs.rank": 1,
        "refs.referralId": 1,
      }
    },
  ]).readConcern("majority");

  console.log(performance.now() - start);

  return foundUser;

  return {
    msg: 'bruh',
    what: 'dont know'
  };
})
