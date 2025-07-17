"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVariantEvent = void 0;
// src\models\UserVariantEvent.ts
const mongoose_1 = __importDefault(require("mongoose"));
const UserVariantEventSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    variantId: { type: String, required: true },
    event: { type: String, enum: ["stay_time", "cta_click", "utm_landing"], required: true },
    value: { type: Number },
    timestamp: { type: Number, required: true },
    utms: {
        type: Map,
        of: String,
    }
});
exports.UserVariantEvent = mongoose_1.default.model("UserVariantEvent", UserVariantEventSchema);
