"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\routes\trackRoute.ts
const express_1 = require("express");
const getUserIdFromIP_1 = require("../utils/getUserIdFromIP");
const UserVariantEvent_1 = require("../models/UserVariantEvent");
const router = (0, express_1.Router)();
router.post("/track", async (req, res) => {
    console.log("📥 /track route hit");
    try {
        const { event, value, variantId, utms } = req.body;
        if (!event || !variantId) {
            res.status(400).json({ error: "Missing 'event' or 'variantId' in body" });
            return;
        }
        console.log("🔍 Body received:", req.body);
        // Get user's IP address
        const ip = req.headers["x-forwarded-for"] ||
            req.socket.remoteAddress ||
            "unknown";
        // Generate userId from IP
        const userId = (0, getUserIdFromIP_1.getUserIdFromIP)(ip);
        const newEvent = new UserVariantEvent_1.UserVariantEvent({
            userId,
            variantId,
            event,
            value: typeof value === "number" ? value : undefined,
            timestamp: Date.now(),
            utms: utms || undefined,
        });
        await newEvent.save();
        console.log("✅ Event saved:", newEvent);
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error("❌ Failed to save event:", err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
