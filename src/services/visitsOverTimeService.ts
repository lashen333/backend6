// src\services\visitsOverTimeService.ts
import { UserAnalytics } from "../models/UserAnalytics";

export async function fetchVisitsOverTime() {
  return await UserAnalytics.aggregate([
    { $match: { lastSeen: { $exists: true } } },
    {
      $project: {
        date: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: { $toDate: "$lastSeen" },
          },
        },
      },
    },
    {
      $group: {
        _id: "$date",
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0, date: "$_id", count: 1 } },
    { $sort: { date: 1 } },
  ]);
}
