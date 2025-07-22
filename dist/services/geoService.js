"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupGeo = lookupGeo;
const undici_1 = require("undici");
async function lookupGeo(ip) {
    try {
        const token = process.env.IPINFO_TOKEN || "dff57e91777a5a"; // use env for safety
        const safeIp = String(ip); // ensure it's a string
        const res = await (0, undici_1.fetch)(`https://ipinfo.io/${safeIp}/json?token=${token}`);
        if (!res.ok)
            throw new Error("Failed to fetch geo data");
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
