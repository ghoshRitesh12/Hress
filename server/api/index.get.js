import User from "../models/User.model";


export default eventHandler(async (event) => {
  // return 'bruasdh';
  return await User.find();

})

