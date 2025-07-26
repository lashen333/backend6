// src\services\geoService.ts
import https from "https";
import fetch from "node-fetch";

// Update this with your real OpenCage API key!
const OPENCAGE_KEY = "7eda444560fe4414b1d138ab182809c3";
const IPINFO_TOKEN = "dff57e91777a5a";

export async function lookupGeoImproved(
  ip?: string,
  lat?: number,
  lon?: number
): Promise<{ country?: string; city?: string; province?: string; district?: string; region?: string; method: string }> {
  if (lat && lon) {
    // Use OpenCage for high-accuracy reverse geocoding
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${OPENCAGE_KEY}`;
      const geoRes = await fetch(url);
      const geoData = (await geoRes.json()) as any;

      console.log("Full OpenCage geoData:", JSON.stringify(geoData, null, 2));
      const components = geoData.results[0]?.components || {};
      return {
        country: components.country || "",
        province: components.state || components.province || "",
        district: components.county || components.district || "",
        city: components.city || components.town || components.village || "",
        region: components.state || components.province || "",
        method: "gps"
      };
    } catch (e) {
      console.error("Geocode error:", e);
    }
  }
  // Fallback: IP-based geolocation
  return new Promise((resolve) => {
    const url = `https://ipinfo.io/${ip}/json?token=${IPINFO_TOKEN}`;
    https.get(url, (res) => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
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
    }).on("error", (err) => {
      console.error("🌍 Geo lookup error:", err);
      resolve({ method: "error" });
    });
  });
}
