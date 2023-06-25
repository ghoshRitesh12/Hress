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
    pfp: {
      type: String,
      default: () => 
        'https://api.dicebear.com/6.x/bottts/png'+`?seed=${Date.now()}&eyes=shade01`+
        '&mouth=smile01&texture=circuits'+'&face=round02&sides=square'
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
    courseType: {
      type: String,
      required: true
    },

    personalInfo: {
      pancardNo: { type: String, default: null },
      phoneNumber: { type: Number, default: null },
      country: { type: String, default: null },
      postalCode: { type: String, default: null },
      cityState: { type: String, default: null },
      streetAddress: { type: String, default: null },
      bankAccountNo: { type: Number, default: null },
      ifsc: { type: String, default: null }
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

// userSchema.pre('')


export default mongoose.model(collectionName, userSchema);
