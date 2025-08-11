// src\controllers\performanceController.ts
import { Request, Response } from "express";
import { fetchFullPerformanceStats } from "../services/performanceService";

export async function getPerformanceStats(req: Request, res: Response) {
  try {
    const result = await fetchFullPerformanceStats();
    res.json(result);
  } catch (err) {
    console.error("❌ Failed to analyze:", err);
    res.status(500).json({ error: "Server error" });
  }
}
