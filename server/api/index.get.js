import User from "../models/User.model";


export default eventHandler(async (event) => {
  return await User.find();

})

