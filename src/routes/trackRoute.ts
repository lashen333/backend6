// src\routes\trackRoute.ts
import { Router, Request, Response } from "express";
import { getUserIdFromIP } from "../utils/getUserIdFromIP";
import { UserVariantEvent } from "../models/UserVariantEvent";

const router = Router();

router.post("/track", async (req: Request, res: Response): Promise<void> => {
   console.log("📥 /track route hit");
  try {
    const { event, value, variantId, utms } = req.body;

    if (!event || !variantId) {
      res.status(400).json({ error: "Missing 'event' or 'variantId' in body" });
      return;
    }
    console.log("🔍 Body received:", req.body);


    // Get user's IP address
    const ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown";

    // Generate userId from IP
    const userId = getUserIdFromIP(ip);

    const newEvent = new UserVariantEvent({
      userId,
      variantId,
      event,
      value: typeof value === "number" ? value : undefined,
      timestamp: Date.now(),
      utms: utms || undefined,
    });

    await newEvent.save();

    console.log("✅ Event saved:", newEvent);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to save event:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
