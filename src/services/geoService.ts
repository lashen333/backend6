// src\services\geoService.ts

const fetch = (...args: [any, any?]) => import('node-fetch').then(mod => mod.default(...args));

export async function lookupGeo(ip: string) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);

    const data = await res.json() as { country?: string; city?: string; regionName?: string };

    console.log("🌎 Raw geo API response:", data);
    return {
      country: data.country,
      city: data.city,
      region: data.regionName,
    };
  } catch (err) {
    console.log("Geo lookup error:", err);
    return {};
  }
}
