"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignMap = void 0;
// src\models\CampaignMap.ts
const mongoose_1 = __importDefault(require("mongoose"));
const CampaignMapSchema = new mongoose_1.default.Schema({
    campaignId: { type: String, required: true },
    name: String,
    intent: String,
    targetAudience: String,
    variants: [
        {
            contentId: String,
            title: String,
            subtitle: String,
            ctaText: String,
        }
    ],
});
exports.CampaignMap = mongoose_1.default.model("CampaignMap", CampaignMapSchema);
