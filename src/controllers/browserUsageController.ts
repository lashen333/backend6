// src\controllers\browserUsageController.ts
import { Request, Response } from "express";
import { fetchBrowserUsageStats } from "../services/browserUsageService";

export async function getBrowserUsage(req: Request, res: Response){
    try {
        const stats = await fetchBrowserUsageStats();
        res.json(stats); // [{ browser: "Chrome", count: 50 }, ...]
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch browser usage stats" });
    }
}