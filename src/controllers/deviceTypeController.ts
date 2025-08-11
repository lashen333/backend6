// src\controllers\deviceTypeController.ts
import { Request, Response } from "express";
import { fetchDeviceTypeStats } from "../services/deviceTypeService";

export async function getDeviceTypeStats(req: Request, res: Response) {
  try {
    const stats = await fetchDeviceTypeStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch device type stats" });
  }
}
