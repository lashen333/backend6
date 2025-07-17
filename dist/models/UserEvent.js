"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEvent = void 0;
// src\models\UserEvent.ts
const mongoose_1 = __importDefault(require("mongoose"));
const userEventSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    event: { type: String, required: true },
    value: { type: Number, required: false },
    timestamp: { type: Number, default: Date.now },
}, { timestamps: true });
exports.UserEvent = mongoose_1.default.model("UserEvent", userEventSchema);
