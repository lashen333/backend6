// src/services/geoService.ts

const fetch = (...args: [any, any?]) => import('node-fetch').then(mod => mod.default(...args));

export async function lookupGeo(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json() as { country?: string; city?: string; regionName?: string };
    return {
      country: data.country,
      city: data.city,
      region: data.regionName,
    };
  } catch {
    return {};
  }
}
