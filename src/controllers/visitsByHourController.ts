// src\controllers\visitsByHourController.ts
import { Request, Response } from "express";
import { fetchVisitsByHour } from "../services/visitsByHourService";

export async function getVisitsByHour(req: Request, res: Response) {
  const timezone = req.query.timezone as string || "UTC";
  try {
    const data = await fetchVisitsByHour(timezone);
    res.json(data);
  } catch (err) {
    console.error("Visits by hour error:", err);
    res.status(500).json({ error: "Failed to aggregate visits by hour" });
  }
}
