// src\models\UserVariantEvent.ts
import mongoose from "mongoose";

const UserVariantEventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  variantId: { type: String, required: true },
  event: { type: String, enum: ["stay_time", "cta_click" , "utm_landing"], required: true },
  value: { type: Number },
  timestamp: { type: Number, required: true },
  utms: {
    type:Map,
    of: String,
  }
  
});

export const UserVariantEvent = mongoose.model("UserVariantEvent", UserVariantEventSchema);
