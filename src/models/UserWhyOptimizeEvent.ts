// src\models\UserWhyOptimizeEvent.ts
import mongoose from "mongoose";

const UserWhyOptimizeEventSchema = new mongoose.Schema({
  userId: String, // visitor ID or user ID
  variantId: mongoose.Schema.Types.ObjectId,
  boxIndex: Number,
  event: String, // e.g., 'impression', 'click', 'stay_time'
  value: mongoose.Schema.Types.Mixed, // optional (e.g., stay time in seconds)
  timestamp: Number,
  utms: mongoose.Schema.Types.Mixed, // UTM params for analytics
  geo: mongoose.Schema.Types.Mixed, // geo info if you want
  device: mongoose.Schema.Types.Mixed // device info if you want
});

export const UserWhyOptimizeEvent = mongoose.model(
  "UserWhyOptimizeEvent",
  UserWhyOptimizeEventSchema
);
