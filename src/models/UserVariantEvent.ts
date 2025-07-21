// src\models\UserVariantEvent.ts

import mongoose from 'mongoose';

const UserVariantEventSchema = new mongoose.Schema({
  userId: String,
  variantId: mongoose.Schema.Types.ObjectId,
  event: String,
  value: Number,
  timestamp: Number,
  utms: {
    type: Map,
    of: String, // or you can use `mongoose.Schema.Types.Mixed` if more flexibility needed
  }
});

export const UserVariantEvent = mongoose.model('UserVariantEvent', UserVariantEventSchema);
