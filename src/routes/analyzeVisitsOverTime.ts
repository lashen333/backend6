// src\routes\analyzeVisitsOverTime.ts
import { Router } from "express";
import { UserAnalytics } from "../models/UserAnalytics";

const router = Router();

router.get("/analyze-visits-over-time", async (req, res) => {
  try {
    const stats = await UserAnalytics.aggregate([
      {
        $match: { lastSeen: { $exists: true } }
      },
      {
        $project: {
          // Converts timestamp (milliseconds) to YYYY-MM-DD string
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $toDate: "$lastSeen" }
            }
          }
        }
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 }
        }
      },
      {
        $project: { _id: 0, date: "$_id", count: 1 }
      },
      { $sort: { date: 1 } }
    ]);
    res.json(stats); // [{ date: "2025-07-22", count: 10 }, ...]
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch visit stats" });
  }
});
export default router;
