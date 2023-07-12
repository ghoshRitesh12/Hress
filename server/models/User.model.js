import mongoose from "mongoose";
import { randomBytes } from "crypto";

const collectionName = 'Users';

const userSchema = new mongoose.Schema({
    info: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      phoneNumber: { type: String, default: null },
      country: { type: String, default: null },
      postalCode: { type: String, default: null },
      cityState: { type: String, default: null },
      streetAddress: { type: String, default: null },
      xlmWalletAddress: { type: String, default: null },
      pancardNo: { type: String, default: null },
      bankAccountNo: { type: String, default: null },
      ifsc: { type: String, default: null },
    },
    password: { type: String, required: true },
    pfp: {
      type: String,
      default: () =>
        'https://api.dicebear.com/6.x/bottts/png'+`?seed=${Date.now()}&eyes=shade01`+
        '&mouth=smile01&texture=circuits'+'&face=round02&sides=square'
    },
    role: { type: String, default: 'member' },

    active: { type: Boolean, default: false, },
    verified: { type: Boolean, default: false, },
    courseType: { type: String, required: true },
    referralId: {
      type: String,
      unique: true,
      default: () => randomBytes(
        parseInt(useRuntimeConfig().REFERRAL_ID_BYTES)
      ).toString('hex')
    },

    rank: { type: Number, default: 1, },
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
    collection: collectionName,
    writeConcern: {
      w: 'majority',
      j: true
    }
  }
)



export default mongoose.model(collectionName, userSchema);
