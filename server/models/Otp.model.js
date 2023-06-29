import { Schema, model } from 'mongoose';

const collectionName = 'Otp';

const otpSchema = new Schema({
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
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
