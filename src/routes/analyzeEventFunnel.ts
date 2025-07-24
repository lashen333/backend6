// src\routes\analyzeEventFunnel.ts
import { Router } from "express";
import { UserAnalytics } from "../models/UserAnalytics";

const router = Router();

router.get("/analyze-event-funnel", async (req, res) => {
  try {
    // Flatten events from all users, count occurrences by event type
    const allEvents = await UserAnalytics.aggregate([
      { $unwind: "$events" },
      {
        $group: {
          _id: "$events.event",
          count: { $sum: 1 }
        }
      },
      {
        $project: { _id: 0, event: "$_id", count: 1 }
      },
      { $sort: { count: -1 } }
    ]);
    res.json(allEvents); // [{ event: "cta_click", count: 25 }, ...]
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event funnel stats" });
  }
});
export default router;
