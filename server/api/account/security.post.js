import User from "~/server/models/User.model"
import { nativeAuthenticate } from "~/server/helpers/middleware/native.auth";

export default eventHandler(async (event) => {
  try {
    await nativeAuthenticate(event);

    return 'Will be implemented later';

  } catch (err) {
    
  }
})
