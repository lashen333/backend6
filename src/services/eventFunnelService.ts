// src\services\eventFunnelService.ts
import { UserAnalytics } from "../models/UserAnalytics";

export async function fetchEventFunnelStats() {
  return await UserAnalytics.aggregate([
    { $unwind: "$events" },
    {
      $group: {
        _id: "$events.event",
        count: { $sum: 1 },
      },
    },
    {
      $project: { _id: 0, event: "$_id", count: 1 },
    },
    { $sort: { count: -1 } },
  ]);
}
