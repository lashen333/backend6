// src\routes\analyzeBrowserUsage.ts
import { Router } from "express";
import { UserAnalytics } from "../models/UserAnalytics";

const router = Router();

router.get("/analyze-browser-usage", async (req, res) => {
  try {
    const stats = await UserAnalytics.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$browser", "Unknown"] },
          count: { $sum: 1 }
        }
      },
      {
        $project: { _id: 0, browser: "$_id", count: 1 }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats); // [{ browser: "Chrome", count: 50 }, ...]
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch browser usage stats" });
  }
});

export default router;
