import User from "~/server/models/User.model";
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    const foundUser = await User.aggregate([
      {
        $match: {
          'info.email': event?.user?.email
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
    ]).readConcern("majority");

    if (!foundUser || foundUser?.length === 0) {
      return sendError(event, createError({
        statusCode: 404,
        statusMessage: "User not found"
      }))
    }

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