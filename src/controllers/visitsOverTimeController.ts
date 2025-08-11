// src\controllers\visitsOverTimeController.ts
import { Request, Response } from "express";
import { fetchVisitsOverTime } from "../services/visitsOverTimeService";

export async function getVisitsOverTime(req: Request, res: Response) {
  try {
    const stats = await fetchVisitsOverTime();
    res.json(stats);
  } catch {
    res.status(500).json({ error: "Failed to fetch visit stats" });
  }
}
