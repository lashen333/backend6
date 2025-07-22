// src/services/geoService.ts
import https from 'https';

export function lookupGeo(ip: string): Promise<{ country?: string; city?: string; region?: string }> {
  return new Promise((resolve) => {
    const url = `https://ipinfo.io/${ip}/json?token=dff57e91777a5a`;

    https.get(url, (res) => {
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
        } catch (err) {
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
