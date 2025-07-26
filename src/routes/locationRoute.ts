// src\routes\locationRoute.ts
import { Router, Request, Response } from "express";
import fetch from "node-fetch";

const router = Router();

router.post("/track-location", async (req: Request, res: Response) => {
  let { lat, lon } = req.body;
  let locationInfo: any = null;

  if (lat && lon) {
    // ----------- 1. User provided accurate location -----------
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=7eda444560fe4414b1d138ab182809c3`;
    try {
      const geoRes = await fetch(url);
      const geoData = await geoRes.json() as any;

      // LOG: Show full response and components
      console.log("Full OpenCage geoData:", JSON.stringify(geoData, null, 2));
      if (geoData.results && geoData.results[0]) {
        console.log("First result components:", geoData.results[0].components);
      }

      // Extract district/city/province/country
      const components = geoData.results[0]?.components || {};
      locationInfo = {
        country: components.country || "",
        province: components.state || components.province || "",
        district: components.county || components.district || "",
        city: components.city || components.town || components.village || "",
        lat,
        lon,
        method: "gps"
      };
    } catch (e) {
      console.error("Geocode error:", e);
      locationInfo = { error: "Geocode lookup failed" };
    }
  } else {
    // ----------- 2. Fallback: IP-based geolocation -----------
    try {
      // Get the IP address
      const ip =
        req.headers["x-forwarded-for"]?.toString().split(",")[0] ||
        req.socket.remoteAddress ||
        "";
      const geoRes = await fetch(
        `https://ipinfo.io/${ip}/json?token=dff57e91777a5a`
      );
      const geoData = await geoRes.json() as any;

      // LOG: Show full IP geodata
      console.log("Full ipinfo geoData:", JSON.stringify(geoData, null, 2));

      // Parse IP location (province = region in ipinfo)
      const [iplat, iplon] = (geoData.loc || "").split(",");
      locationInfo = {
        country: geoData.country || "",
        province: geoData.region || "",
        city: geoData.city || "",
        lat: iplat,
        lon: iplon,
        method: "ip"
      };
    } catch (e) {
      console.error("IP-based geolocation error:", e);
      locationInfo = { error: "IP geolocation lookup failed" };
    }
  }

  // ----------- Respond with location info -----------
  res.json(locationInfo);
});

export default router;
