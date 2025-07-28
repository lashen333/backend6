// src\services\geoService.ts
import https from "https";

// Use environment variables for keys (better security)
const OPENCAGE_KEY = process.env.OPENCAGE_KEY || "7eda444560fe4414b1d138ab182809c3";
const IPINFO_TOKEN = process.env.IPINFO_TOKEN || "dff57e91777a5a";

export async function lookupGeoImproved(
  ip?: string,
  lat?: number,
  lon?: number
): Promise<{
  country?: string;
  city?: string;
  province?: string;
  district?: string;
  region?: string;
  village?: string;
  road?: string;
  lat?: number;
  lon?: number;
  method: string;
}> {
  // 1. If we have GPS (lat/lon), use OpenCage
  if (lat && lon) {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_KEY}`;
      const geoRes = await fetch(url); // Using native fetch (Node 18+)
      const geoData = (await geoRes.json()) as any;

      console.log("Full OpenCage geoData:", JSON.stringify(geoData, null, 2));
      const components = geoData.results[0]?.components || {};

      return {
        country: components.country || "",
        province: components.state || components.province || "",
        district: components.county || components.district || "",
        city: components.city || components.town || components.village || "",
        region: components.state || components.province || "",
        village: components.village || "",
        road: components.road || "",
        lat,
        lon,
        method: "gps"
      };
    } catch (e) {
      console.error("Geocode error:", e);
    }
  }

  // 2. Fallback: IP-based lookup (using ipinfo)
  return new Promise((resolve) => {
    const url = `https://ipinfo.io/${ip}/json?token=${IPINFO_TOKEN}`;
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve({
              country: json.country || "",
              province: json.region || "",
              city: json.city || "",
              region: json.region || "",
              method: "ip"
            });
          } catch (err) {
            console.error("🌍 Geo parse error:", err);
            resolve({ method: "error" });
          }
        });
      })
      .on("error", (err) => {
        console.error("🌍 Geo lookup error:", err);
        resolve({ method: "error" });
      });
  });
}
