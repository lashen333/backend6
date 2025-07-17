"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\routes\optimizeRoute.ts
const express_1 = require("express");
const UserEvent_1 = require("../models/UserEvent");
const getUserIdFromIP_1 = require("../utils/getUserIdFromIP");
const router = (0, express_1.Router)();
router.get("/optimize-content", async (req, res) => {
    const ip = req.ip || "";
    const userId = (0, getUserIdFromIP_1.getUserIdFromIP)(ip);
    const recentEvents = await UserEvent_1.UserEvent.find({ userId }).sort({ timestamp: -1 }).limit(10);
    let clicked = false;
    let shortStay = false;
    for (const e of recentEvents) {
        if (e.event === "cta_click")
            clicked = true;
        if (e.event === "stay_time" && e.value && e.value < 5000)
            shortStay = true;
    }
    const shouldChange = !clicked && shortStay;
    const variants = [
        {
            title: "Unlock More Sales with Our Tools",
            subtitle: "Boost your conversion rates using smart optimization",
            ctaText: "Try It Free",
        },
        {
            title: "Struggling to Convert Visitors?",
            subtitle: "Let AI help you rewrite and improve your landing pages",
            ctaText: "Boost My Conversions",
        },
    ];
    res.json({
        variant: shouldChange ? variants[1] : variants[0],
        change: shouldChange,
    });
});
exports.default = router;
