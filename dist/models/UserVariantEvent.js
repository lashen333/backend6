"use strict";
// src\models\UserVariantEvent.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVariantEvent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserVariantEventSchema = new mongoose_1.default.Schema({
    userId: String,
    variantId: mongoose_1.default.Schema.Types.ObjectId,
    event: String,
    value: Number,
    timestamp: Number,
    utms: {
        type: Map,
        of: String, // or you can use `mongoose.Schema.Types.Mixed` if more flexibility needed
    }
});
exports.UserVariantEvent = mongoose_1.default.model('UserVariantEvent', UserVariantEventSchema);
