import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const collectionName = 'ActiveToken';

const activeTokenSchema = new Schema({
  issuedBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  usedBy: {
    type: String,
    default: null
  },
  token: {
    type: String,
    default: function() {
      const tokenLength = 18;
      return randomUUID().slice(0, tokenLength)
    }
  },
  issuedAt: {
    type: Number,
    default: () => Date.now()
  }  
},
  {
    collection: collectionName,
    writeConcern: {
      w: 'majority',
      j: true
    }
  }
)

export default model(collectionName, activeTokenSchema);
