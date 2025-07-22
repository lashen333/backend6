import { fetch } from 'undici';

export async function lookupGeo(ip: string) {
  try {
    const token = process.env.IPINFO_TOKEN || "dff57e91777a5a"; // use env for safety
    const safeIp = String(ip); // ensure it's a string

    const res = await fetch(`https://ipinfo.io/${safeIp}/json?token=${token}`);

    if (!res.ok) throw new Error("Failed to fetch geo data");

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
