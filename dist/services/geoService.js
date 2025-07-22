"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupGeo = lookupGeo;
// src\services\geoService.ts
const undici_1 = require("undici");
async function lookupGeo(ip) {
    try {
        const res = await (0, undici_1.fetch)(`https://ipinfo.io/${ip}/json?token=dff57e91777a5a`);
        const data = await res.json();
        return {
            country: data.country_name || "",
            city: data.city || "",
            region: data.region || "",
        };
    }
    catch (err) {
        console.error("Geo lookup error:", err);
        return {};
    }
}
