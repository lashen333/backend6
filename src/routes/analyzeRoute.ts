// src\routes\analyzeRoute.ts
import { Router, Request, Response } from "express";
import { UserVariantAssignment } from "../models/UserVariantAssignment";
import { UserVariantEvent } from "../models/UserVariantEvent";
import mongoose from "mongoose";

const router = Router();

router.get("/analyze-performance", async (req: Request, res: Response) => {
    try {
        //Total Views Per Variant
        const views = await UserVariantAssignment.aggregate([
            {
                $group: {
                    _id: "$variantId",
                    totalViews: { $sum: "$shownCount" }
                },
            },
        ]);

        //CTA Clicks Per Variant
        const ctaClicks = await UserVariantEvent.aggregate([
            { $match: { event: "cta_click" } },
            {
                $group: {
                    _id: "$variantId",
                    totalClicks: { $sum: 1 }
                },
            },
        ]);

        //Avg Stay Time Per Variant
        const stayTimes = await UserVariantEvent.aggregate([
            { $match: { event: "stay_time" } },
            {
                $group: {
                    _id: "$variantId",
                    avgStayTime: { $avg: "$value" }
                },
            },
        ]);

        //Merge All
        const mergeMap = new Map<string, any>();

        views.forEach((v) => {
            mergeMap.set(v._id.toString(), { variantId: v._id, totalViews: v.totalViews });
        });
        ctaClicks.forEach((c) => {
            const id = c._id.toString();
            mergeMap.set(id, { ...(mergeMap.get(id) || {}), ctaClicks: c.ctaClicks });
        });

        stayTimes.forEach((s) => {
            const id = s._id.toString();
            mergeMap.set(id, { ...(mergeMap.get(id) || {}), avgStayTime: s.avgStayTime });
        });

        const result = Array.from(mergeMap.values());
        res.json(result);
    } catch (err: any) {
        console.error("❌ Failed to analyze:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;