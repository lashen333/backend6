// src\routes\analyzeGeoPerformance2.ts
// src/routes/analyzeGeoPerformance.ts
import { Router, Request, Response } from "express";
import { UserAnalytics } from "../models/UserAnalytics";
const router = Router();

router.get("/user-locations", async (req: Request, res: Response) => {
  try {
    const users = await UserAnalytics.find(
      { lat: { $exists: true }, lon: { $exists: true } },
      { lat: 1, lon: 1, city: 1, region: 1, country: 1, village: 1, road: 1, _id: 0 }
    ).limit(1000); // Limit for demo/performance
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: "Could not fetch user locations." });
  }
});
export default router;
