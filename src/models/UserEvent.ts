// src\models\UserEvent.ts
import mongoose from "mongoose";

const userEventSchema = new mongoose.Schema({
  ip: String,
  event: String,
  value: {
    type: Number,
    required: false, // ✅ make it optional
  },
  timestamp: { type: Date, default: Date.now },
});

export const UserEvent = mongoose.model("UserEvent", userEventSchema);
