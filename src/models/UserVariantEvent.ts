// src\models\UserVariantEvent.ts
import mongoose from "mongoose";

const UserVariantEventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, ref: "HeroVariant", required: true },
  event: { type: String, enum: ["stay_time", "cta_click"], required: true },
  value: { type: Number },
  timestamp: { type: Number, required: true },
});

export const UserVariantEvent = mongoose.model("UserVariantEvent", UserVariantEventSchema);
