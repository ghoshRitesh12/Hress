import User from "../models/User.model";

const getATO = async () => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthJoinees = await User.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$createdAt" }, currentMonth],
          },
          role: { $eq: "member" },
          active: { $eq: true }
        },
      },
      {
        $project: {
          _id: 0,
          referralId: 1,
          courseType: 1
        },
      },
    ]);


    let ato = 0;
    for(const joinee of currentMonthJoinees) {
      const joiningFees = (
        joinee.courseType === 'advance' ? 
        20000 : 
        (joinee.courseType === 'basic' ? 12000 : 0)
      );

      ato += joiningFees
    }

    return ato;

  } catch (err) {
    throw err
  }
}

export default getATO
