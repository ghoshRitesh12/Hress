import { Schema, model } from "mongoose";
import { randomInt } from "crypto";

const collectionName = "Otp";

const otpSchema = new Schema({
  email: {
    type: String,
    index: true,
    required: true,
  },
  otp: {
    type: Number,
    default: () => randomInt(100000, 999999)
  },
  expireAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 mins
  },
},
  {
    collection: collectionName,
    writeConcern: {
      w: "majority",
      journal: true,
    }
  }
)

export default model(collectionName, otpSchema);
