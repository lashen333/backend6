// src\services\geoLocationsService.ts
import { UserAnalytics } from "../models/UserAnalytics";

export async function fetchUserLocations() {
  return await UserAnalytics.find(
    { lat: { $exists: true }, lon: { $exists: true } },
    { lat: 1, lon: 1, city: 1, region: 1, country: 1, village: 1, road: 1, _id: 0 }
  ).limit(1000);
}
