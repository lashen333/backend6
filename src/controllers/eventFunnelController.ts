// src\controllers\eventFunnelController.ts
import { Request, Response } from "express";
import { fetchEventFunnelStats } from "../services/eventFunnelService";

export async function getEventFunnel(req: Request, res: Response) {
  try {
    const stats = await fetchEventFunnelStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event funnel stats" });
  }
}
