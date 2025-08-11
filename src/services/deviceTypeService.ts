// src\services\deviceTypeService.ts
import { UserAnalytics } from "../models/UserAnalytics";

export async function fetchDeviceTypeStats() {
  return await UserAnalytics.aggregate([
    {
      $group: {
        _id: { $ifNull: ["$deviceType", "Unknown"] },
        count: { $sum: 1 },
      },
    },
    {
      $project: { _id: 0, deviceType: "$_id", count: 1 },
    },
    { $sort: { count: -1 } },
  ]);
}
