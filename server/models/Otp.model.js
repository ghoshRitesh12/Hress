import { Schema, model } from 'mongoose';
import { randomInt } from 'crypto';

const collectionName = 'Otp';

const otpSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      default: () => randomInt(100000, 999999)
    },
    validMins: {
      type: Number,
      default: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '30s'
    }
  },
  { collection: collectionName }
)

export default model(collectionName, otpSchema);
