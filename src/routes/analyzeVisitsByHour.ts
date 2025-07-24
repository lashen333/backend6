// src\routes\analyzeVisitsByHour.ts

import { Router } from "express";
import { UserAnalytics } from "../models/UserAnalytics";
import moment from "moment-timezone"; // install this: npm i moment-timezone

const router = Router();

router.get("/analyze-visits-by-hour", async (req, res) => {
  const timezone = req.query.timezone as string || "UTC";
  try {
    // 1. Fetch all timestamps (use firstSeen, lastSeen, or your preferred field)
    const visits = await UserAnalytics.find({}, { firstSeen: 1 }).lean();

    // 2. Convert to hour in the selected timezone
    const hourCounts: { [key: number]: number } = {};
    visits.forEach((v: any) => {
      const utcMillis = v.firstSeen;
      if (!utcMillis) return;
      const hour = moment.tz(utcMillis, timezone).hour(); // 0-23 local hour
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    // 3. Format as array (for recharts)
    const stats = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      visits: hourCounts[hour] || 0,
    }));

    res.json(stats);
  } catch (err) {
    console.error("Visits by hour error:", err);
    res.status(500).json({ error: "Failed to aggregate visits by hour" });
  }
});

export default router;
