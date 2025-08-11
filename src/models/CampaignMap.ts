// src\models\CampaignMap.ts
import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
    contentId: {type:String, default: () => new mongoose.Types.ObjectId().toString()},
    title: String,
    subtitle: String,
    ctaText: String,

    asIds:[String],
    limit: {type: Number, default: 3},
    shown: {type: Number, default: 0},
    lastServedAt: Number,
})

const CampaignMapSchema = new mongoose.Schema({
    campaignId: {type: String, required: true },
    name: String,
    intent: String,
    targetAudience: String,
    variants: [VariantSchema],
    winnerContentId: String,
});

CampaignMapSchema.index({campaignId:1})

export const CampaignMap = mongoose.model("CampaignMap",CampaignMapSchema);