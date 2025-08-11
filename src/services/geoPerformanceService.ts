// src\services\geoPerformanceService.ts
import { UserAnalytics } from "../models/UserAnalytics";

export async function fetchGeoStats() {
  return await UserAnalytics.aggregate([
    { $group: { _id: { $ifNull: ["$country", "Unknown"] }, count: { $sum: 1 } } },
    { $project: { _id: 0, country: "$_id", count: 1 } },
    { $sort: { count: -1 } }
  ]);
}
