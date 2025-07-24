// src\routes\analyzeGeoPerformance.ts
// src/routes/analyzeGeoPerformance.ts
import { Router } from "express";
import { UserAnalytics } from "../models/UserAnalytics";

const router = Router();

router.get("/analyze-geo-performance", async (req, res) => {
  try {
    const stats = await UserAnalytics.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$country", "Unknown"] },
          count: { $sum: 1 }
        }
      },
      {
        $project: { _id: 0, country: "$_id", count: 1 }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats);
  } catch (e) {
    res.status(500).json({ error: "Failed to fetch geo stats" });
  }
});

export default router;
