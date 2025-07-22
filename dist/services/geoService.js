"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupGeo = lookupGeo;
// src/services/geoService.ts
const https_1 = __importDefault(require("https"));
function lookupGeo(ip) {
    return new Promise((resolve) => {
        const url = `https://ipinfo.io/${ip}/json?token=dff57e91777a5a`;
        https_1.default.get(url, (res) => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({
                        country: json.country || '',
                        city: json.city || '',
                        region: json.region || '',
                    });
                }
                catch (err) {
                    console.error("🌍 Geo parse error:", err);
                    resolve({});
                }
            });
        }).on('error', (err) => {
            console.error("🌍 Geo lookup error:", err);
            resolve({});
        });
    });
}
