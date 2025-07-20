// src\models\UserAnalytics.ts
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    event: String,
    value: mongoose.Schema.Types.Mixed,
    timestamp: Number,
});

const UserAnalyticsSchema = new mongoose.Schema({
  visitorId: { type: String, required: true },
  userId: String,
  ip: String,
  country: String,
  city: String,
  region: String,
  deviceType: String,
  os: String,
  browser: String,
  utms: mongoose.Schema.Types.Mixed,
  platform: String,
  firstSeen: Number,
  lastSeen: Number,
  visits: Number,
  events: [EventSchema],
});

export const UserAnalytics = mongoose.model("UserAnalytics", UserAnalyticsSchema);
