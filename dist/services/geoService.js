"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupGeo = lookupGeo;
// src/services/geoService.ts
const undici = __importStar(require("undici"));
async function lookupGeo(ip) {
    try {
        // 💡 Check for missing/invalid IP
        if (!ip || typeof ip !== 'string' || ip === 'unknown') {
            console.warn("⚠️ Invalid IP passed to lookupGeo:", ip);
            return {};
        }
        const url = `https://ipinfo.io/${ip}/json?token=dff57e91777a5a`;
        const res = await undici.fetch(url);
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
