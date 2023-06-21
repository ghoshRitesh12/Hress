import { randomBytes } from 'crypto';
import mongoose from "mongoose";

const collectionName = 'Users';

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      default: null,
      // required: true,
      // trim: true,
      // unique: true
    },
    referralId: {
      type: String,
      default: () => randomBytes(
        parseInt(useRuntimeConfig().REFERRAL_ID_BYTES)
      ).toString('hex'),
      unique: true
    },
    active: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    panCardNo: {
      type: String,
      default: null
    },
    bankInfo: {
      accountNo: {
        type: Number,
        default: null
      },
      ifsc: {
        type: String,
        default: null
      }
    },
    rank: {
      type: Number,
      default: 1,
    },
    ancestors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    }],
    levels: [{
      levelNo: {
        type: Number,
        default: 0
      },
      referrals: [{
        commission: {
          type: Number,
          default: 0,
        },
        userRef: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Users'
        },
      }]
    }]

  },
  {
    timestamps: true,
    collection: collectionName
  }
)


export default mongoose.model(collectionName, userSchema);
