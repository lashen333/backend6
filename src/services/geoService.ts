// src/services/geoService.ts
import * as undici from 'undici';

export async function lookupGeo(ip: string) {
  try {
    // 💡 Check for missing/invalid IP
    if (!ip || typeof ip !== 'string' || ip === 'unknown') {
      console.warn("⚠️ Invalid IP passed to lookupGeo:", ip);
      return {};
    }

    const url = `https://ipinfo.io/${ip}/json?token=dff57e91777a5a`;
    const res = await undici.fetch(url);
    const data = await res.json() as {
      country?: string;
      city?: string;
      region?: string;
    };

    return {
      country: data.country || "",
      city: data.city || "",
      region: data.region || "",
    };
  } catch (err) {
    console.error("🌍 Geo lookup error:", err);
    return {};
  }
}
