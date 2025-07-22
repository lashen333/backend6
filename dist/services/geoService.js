"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupGeo = lookupGeo;
// src\services\geoService.ts
const undici_1 = require("undici");
async function lookupGeo(ip) {
    try {
        // 💡 Check for missing/invalid IP
        if (!ip || typeof ip !== 'string' || ip === 'unknown') {
            console.warn("⚠️ Invalid IP passed to lookupGeo:", ip);
            return {};
        }
        const url = `https://ipinfo.io/${ip}/json?token=dff57e91777a5a`;
        const res = await (0, undici_1.fetch)(url);
        const data = await res.json();
        return {
            country: data.country || "",
            city: data.city || "",
            region: data.region || "",
        };
    }
    catch (err) {
        console.error("🌍 Geo lookup error:", err);
        return {};
    }
}
