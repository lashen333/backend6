"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\routes\analyzeRoute.ts
const express_1 = require("express");
const UserVariantAssignment_1 = require("../models/UserVariantAssignment");
const UserVariantEvent_1 = require("../models/UserVariantEvent");
const router = (0, express_1.Router)();
router.get("/analyze-performance", async (req, res) => {
    try {
        //Total Views Per Variant
        const views = await UserVariantAssignment_1.UserVariantAssignment.aggregate([
            {
                $group: {
                    _id: "$variantId",
                    totalViews: { $sum: "$shownCount" },
                    users: { $addToSet: "$userId" }
                }
            },
            {
                $lookup: {
                    from: "herovariants", // <-- make sure this matches your collection name!
                    localField: "_id",
                    foreignField: "_id",
                    as: "variant"
                }
            },
            {
                $unwind: "$variant"
            },
            {
                $project: {
                    totalViews: 1,
                    uniqueUsers: {
                        $cond: {
                            if: { $isArray: "$users" },
                            then: { $size: "$users" },
                            else: 0
                        }
                    },
                    heading: "$variant.title",
                    subtitle: "$variant.subtitle",
                    ctaText: "$variant.ctaText",
                }
            }
        ]);
        //CTA Clicks Per Variant
        const ctaClicks = await UserVariantEvent_1.UserVariantEvent.aggregate([
            { $match: { event: "cta_click" } },
            {
                $group: {
                    _id: "$variantId",
                    totalClicks: { $sum: 1 }
                },
            },
        ]);
        //Avg Stay Time Per Variant
        const stayTimes = await UserVariantEvent_1.UserVariantEvent.aggregate([
            { $match: { event: "stay_time" } },
            {
                $group: {
                    _id: "$variantId",
                    avgStayTime: { $avg: "$value" }
                },
            },
        ]);
        //Merge All
        const mergeMap = new Map();
        views.forEach((v) => {
            const id = v._id.toString();
            mergeMap.set(id, {
                variantId: id,
                totalViews: v.totalViews,
                uniqueUsers: v.uniqueUsers,
                heading: v.heading,
                subtitle: v.subtitle,
                ctaText: v.ctaText,
            });
        });
        ctaClicks.forEach((c) => {
            const id = c._id.toString();
            const existing = mergeMap.get(id) || {};
            const views = existing.totalViews || 0;
            mergeMap.set(id, {
                ...existing,
                ctaClicks: c.totalClicks || 0,
                bounceRate: views > 0 ? ((views - (c.totalClicks || 0)) / views) * 100 : 0,
            });
        });
        stayTimes.forEach((s) => {
            const id = s._id.toString();
            mergeMap.set(id, {
                ...(mergeMap.get(id) || {}),
                avgStayTime: s.avgStayTime,
            });
        });
        const result = Array.from(mergeMap.values());
        res.json(result);
    }
    catch (err) {
        console.error("❌ Failed to analyze:", err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
