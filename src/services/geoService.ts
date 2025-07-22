// src\services\geoService.ts
import { fetch } from 'undici'; 

export async function lookupGeo(ip: string) {
  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json?token=dff57e91777a5a`);
    
    type IPApiResponse = {
      country_name?: string;
      city?: string;
      region?: string;
    };

    const data = await res.json() as IPApiResponse;

    return {
      country: data.country_name || "",
      city: data.city || "",
      region: data.region || "",
    };
  } catch (err) {
    console.error("Geo lookup error:", err);
    return {};
  }
}
