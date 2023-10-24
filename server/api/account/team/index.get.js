import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const res = {
      sponsorer: null,
      userActive: false,
      selectLevels: []
    }

    const foundUser = await User.aggregate([
      {
        $match: {
          'info.email': event?.user?.email
        }
      },
      {
        $project: {
          _id: 0,
          active: 1,
          ancestor: {
            $cond: {
              if: { $eq: ["$active", true] },
              then: { $arrayElemAt: ["$ancestors", -1] },
              else: null
            }
          },
          selectLevels: {
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
      {
        $lookup: {
          from: "Users",
          foreignField: "_id",
          localField: "ancestor",
          as: "ancestors",
          pipeline: [
            {
              $project: {
                _id: 0,
                'info.name': 1,
                'referralId': 1
              }
            }
          ]
        }
      },
      {
        $project: {
          sponsorer: {
            $cond: {
              if: { $isArray: "$ancestors" },
              then: { $arrayElemAt: ["$ancestors", 0] },
              else: null
            }
          },
          userActive: "$active",
          selectLevels: 1,
        }
      }
    ]).readConcern("majority");

    if (!foundUser || foundUser?.length === 0) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: 'User not found'
      }))
    }

    setResponseStatus(event, 200)
    return foundUser?.[0] ?? {};

  } catch (err) {
    console.log(err);
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: "Something Went Wrong"
    }))
  }
})