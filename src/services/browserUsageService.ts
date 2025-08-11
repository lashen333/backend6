// src\services\browserUsageService.ts
import { UserAnalytics } from "../models/UserAnalytics";

export async function fetchBrowserUsageStats(){
    return await UserAnalytics.aggregate([
        {
            $group:{
                _id: { $ifNull: ["$browser", "Unknown"] },
                count: { $sum: 1 }
            }
        },
        {
            $project: { _id: 0, browser: "$_id", count: 1 }
        },
        { $sort: { count: -1 } },
    ]);
}