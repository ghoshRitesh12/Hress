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
      required: true,
      trim: true,
      unique: true
    },
    rank: {
      type: Number,
      default: () => 0,
    },
    sponsoredBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    referrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Referrals' }]

  },
  {
    timestamps: true,
    collection: collectionName
  }
)


export default mongoose.model(collectionName, userSchema);
