// src/services/geoService.ts
import { env } from "../config/env";

// Node 18+ has global fetch. If you’re on older Node, install and polyfill 'undici'.

type GeoResult = {
  country?: string;
  city?: string;
  province?: string;
  district?: string;
  region?: string;
  village?: string;
  road?: string;
  lat?: number;
  lon?: number;
  method: "gps" | "ip" | "error";
};

function withTimeout(ms: number): AbortController {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms).unref?.();
  return controller;
}

export async function lookupGeoImproved(
  ip?: string,
  lat?: number,
  lon?: number
): Promise<GeoResult> {
  // 1) Prefer GPS → OpenCage reverse geocode
  if (typeof lat === "number" && typeof lon === "number") {
    try {
      if (!env.geo.opencageKey) throw new Error("Missing OPENCAGE_KEY");

      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${env.geo.opencageKey}`;
      const controller = withTimeout(6000);
      const resp = await fetch(url, { signal: controller.signal });
      if (!resp.ok) throw new Error(`OpenCage HTTP ${resp.status}`);
      const geoData: any = await resp.json();

      const components = geoData?.results?.[0]?.components ?? {};
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
        method: "gps",
      };
    } catch (e) {
      console.error("Geocode (GPS) error:", e);
      // fall through to IP lookup if we have an IP
    }
  }

  // 2) Fallback: IP-based lookup via ipinfo.io
  try {
    if (!ip) return { method: "error" };
    if (!env.geo.ipinfoToken) throw new Error("Missing IPINFO_TOKEN");

    const controller = withTimeout(5000);
    const resp = await fetch(`https://ipinfo.io/${ip}/json?token=${env.geo.ipinfoToken}`, {
      signal: controller.signal,
    });
    if (!resp.ok) throw new Error(`ipinfo HTTP ${resp.status}`);
    const json: any = await resp.json();

    return {
      country: json.country || "",
      province: json.region || "",
      city: json.city || "",
      region: json.region || "",
      method: "ip",
    };
  } catch (err) {
    console.error("Geo lookup (IP) error:", err);
    return { method: "error" };
  }
}
