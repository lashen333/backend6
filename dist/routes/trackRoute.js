"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src\routes\trackRoute.ts
const express_1 = require("express");
const UserAnalytics_1 = require("../models/UserAnalytics");
const geoService_1 = require("../services/geoService");
const deviceService_1 = require("../services/deviceService");
const router = (0, express_1.Router)();
router.post("/track", async (req, res) => {
    console.log("\n=== 📥 New /track request ====");
    try {
        const { event, value, variantId, utms, visitorId, userAgent, timestamp } = req.body;
        // Basic validation
        if (!event || !variantId || !visitorId) {
            console.warn("❌ Missing required fields:", { event, variantId, visitorId });
            res.status(400).json({ error: "Missing 'event', 'variantId', or 'visitorId' in body" });
            return;
        }
        console.log("✅ Step 1: Received body:", req.body);
        // 1️⃣ Extract platform (utm_source)
        const platform = utms?.utm_source || undefined;
        // Get user's IP address
        const forwarded = req.headers["x-forwarded-for"];
        let ip = "";
        if (typeof forwarded === "string") {
            ip = forwarded.split(",")[0].trim();
        }
        else if (Array.isArray(forwarded)) {
            ip = forwarded[0];
        }
        else {
            ip = req.socket.remoteAddress || "unknown";
        }
        console.log("✅ Step 2a:Headers:", req.headers);
        console.log("✅ Step 2b:Using IP:", ip);
        // Geo/device enrichment
        console.log("📡 Calling lookupGeo with IP:", ip);
        const geo = await (0, geoService_1.lookupGeo)(ip);
        console.log("✅ Step 3a: Geo info:", geo);
        const device = (0, deviceService_1.parseDevice)(userAgent || "");
        console.log("✅ Step 3b: Device info:", device);
        // Use timestamp or fallback to now
        const now = timestamp || Date.now();
        console.log("✅ Step 4: Timestamp:", now);
        // Try to find an existing analytics doc for this visitor
        let doc = await UserAnalytics_1.UserAnalytics.findOne({ visitorId });
        if (!doc) {
            doc = new UserAnalytics_1.UserAnalytics({
                visitorId,
                userId: visitorId, // (Or use your own getUserIdFromIP(ip) if needed)
                ip,
                country: (await geo).country,
                region: (await geo).region,
                city: (await geo).city,
                deviceType: device.deviceType,
                browser: device.browser,
                os: device.os,
                platform,
                utms,
                firstSeen: now,
                lastSeen: now,
                visits: 1,
                events: [{ event, value, variantId, timestamp: now }],
            });
            console.log("✅ Step 5: Creating new analytics doc");
        }
        else {
            doc.lastSeen = now;
            doc.visits = (doc.visits ?? 0) + 1;
            doc.events.push({ event, value, variantId, timestamp: now });
            doc.ip = ip;
            doc.country = (await geo).country;
            doc.city = (await geo).city;
            doc.deviceType = device.deviceType;
            doc.browser = device.browser;
            doc.os = device.os;
            doc.platform = platform;
            doc.utms = utms;
            console.log("✅ Step 5: Updating existing analytics doc");
        }
        await doc.save();
        console.log("✅ Analytics event saved:", doc._id, { event, variantId });
        res.status(200).json({ success: true });
    }
    catch (err) {
        console.error("❌ Failed to save analytics event:", err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
