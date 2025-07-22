"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnalytics = void 0;
// src\models\UserAnalytics.ts
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    event: String,
    value: mongoose_1.default.Schema.Types.Mixed,
    timestamp: Number,
});
const UserAnalyticsSchema = new mongoose_1.default.Schema({
    visitorId: { type: String, required: true },
    userId: String,
    ip: String,
    country: String,
    city: String,
    region: String,
    deviceType: String,
    os: String,
    browser: String,
    utms: mongoose_1.default.Schema.Types.Mixed,
    platform: String,
    firstSeen: Number,
    lastSeen: Number,
    visits: Number,
    events: [EventSchema],
});
exports.UserAnalytics = mongoose_1.default.model("UserAnalytics", UserAnalyticsSchema);
