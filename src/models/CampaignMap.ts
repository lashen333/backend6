// src\models\CampaignMap.ts
import mongoose from "mongoose";

const CampaignMapSchema = new mongoose.Schema({
    campaignId: {type: String, required: true },
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

export const CampaignMap = mongoose.model("CampaignMap",CampaignMapSchema);