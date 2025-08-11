// src\controllers\geoPerformanceController.ts
import { Request, Response } from "express";
import { fetchGeoStats } from "../services/geoPerformanceService";

export async function getGeoStats(req: Request, res: Response) {
  try {
    const stats = await fetchGeoStats();
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Failed to fetch geo stats" });
  }
}
