// src\routes\analyzeDeviceType.ts

import { Router } from "express";
import { UserAnalytics } from "../models/UserAnalytics";

const router = Router();

router.get("/analyze-device-type", async (req, res) => {
  try {
    const stats = await UserAnalytics.aggregate([
      {
        $group: {
          _id: { $ifNull: ["$deviceType", "Unknown"] },
          count: { $sum: 1 }
        }
      },
      {
        $project: { _id: 0, deviceType: "$_id", count: 1 }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(stats); // [{ deviceType: "mobile", count: 20 }, ...]
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch device type stats" });
  }
});
export default router;
