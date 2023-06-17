import User from "../models/User.model.js";
import { getIncentive } from "../helpers/utils.js";



export default eventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log(body);
    // verify body schema
    // use passport

    const foundUser = await User.findOne({ email: body.email });
    if(foundUser) return createError({
      statusCode: 409, 
      message: 'User already exists',
      stack: null
    })

    
    const sponsorer = await User.findOne({ referralId: body.sponsorerId });
    if(!sponsorer) {
      return createError({
        statusCode: 404,
        message: 'Sponsorer not found'
      }) 
    }

    const newUser = await User.create({
      name: body.name,
      email: body.email,
      ancestor: (sponsorer.ancestors.length <= 15) ? [...sponsorer.ancestors, `${sponsorer._id}`].sort() : [],
    });


    // for each ancestor
    newUser.ancestors.map(async (ancestor, index) => {
      try {
        const indexedLevel = newUser.ancestors.length - index;

        const qAncestor = await User.findById(`${ancestor}`);
        if(!qAncestor) return;
        
        const foundIndex = qAncestor.levels.findIndex(level => level.levelNo === indexedLevel);
        if(foundIndex !== -1) {
          qAncestor.levels[foundIndex].referrals.push(newUser._id);

        } else {
          qAncestor.levels.push({
            levelNo: indexedLevel,
            commission: getIncentive(indexedLevel),
            referrals: [newUser._id]
          })

          qAncestor.levels.sort((a, b) => a.levelNo - b.levelNo);
        }

        await qAncestor.save();
        
      } catch (err) {
        console.log(err) 
      }
    })

    event.node.res.statusCode = 201;
    return '';
    
  } catch (err) {
    console.log(err);
    createError({
      statusCode: 500,
      message: err.message
    })
  }
})
