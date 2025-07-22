"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\routes\heroRoute.ts
const express_1 = require("express");
const HeroVariant_1 = require("../models/HeroVariant");
const UserVariantAssignment_1 = require("../models/UserVariantAssignment");
const getUserIdFromIP_1 = require("../utils/getUserIdFromIP");
const CampaignMap_1 = require("../models/CampaignMap");
const router = (0, express_1.Router)();
router.get("/get-hero", async (req, res) => {
    try {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
        const userId = (0, getUserIdFromIP_1.getUserIdFromIP)(ip);
        //🧠 Step 1: Check UTM params from query
        const utm_campaign = req.query.utm_campaign;
        const utm_content = req.query.utm_content;
        if (utm_campaign && utm_content) {
            const campaign = await CampaignMap_1.CampaignMap.findOne({ campaignId: utm_campaign });
            if (!campaign) {
                res.status(404).json({ error: "Campaign not found" });
                return;
            }
            const variant = campaign.variants.find((v) => v.contentId === utm_content);
            if (!variant) {
                res.status(404).json({ error: "Variant not found" });
                return;
            }
            res.status(200).json({
                title: variant.title,
                subtitle: variant.subtitle,
                ctaText: variant.ctaText,
                variantId: `${utm_campaign}_${utm_content}`, // Trackable ID
            });
            return;
        }
        //Find existing assignment
        const existing = await UserVariantAssignment_1.UserVariantAssignment.findOne({ userId }).populate("variantId");
        if (existing && existing.shownCount < 2) {
            //Update shown count
            existing.shownCount += 1;
            existing.lastShown = Date.now();
            await existing.save();
            res.status(200).json(existing.variantId);
            return;
        }
        //Get all variants
        const allVariants = await HeroVariant_1.HeroVariant.find();
        if (!allVariants.length) {
            res.status(404).json({ error: "No variants found" });
            return;
        }
        //Pick a random variant
        const random = allVariants[Math.floor(Math.random() * allVariants.length)];
        //Create new assignment
        const assignment = new UserVariantAssignment_1.UserVariantAssignment({
            userId,
            variantId: random._id,
            shownCount: 1,
            lastShown: Date.now(),
        });
        await assignment.save();
        res.status(200).json(random);
    }
    catch (err) {
        console.error("❌ Failed to fetch hero variant:", err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
