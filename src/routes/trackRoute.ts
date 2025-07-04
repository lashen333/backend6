import { Router, Request, Response } from "express";
import { UserEvent } from "../models/UserEvent";
import { UserEventType } from "../types/UserEvent.types";

const router = Router();

router.post("/track", async (req: Request, res: Response): Promise<void> => {
  try {
    const { event, value } = req.body;

    if (!event) {
      res.status(400).json({ error: "Missing 'event' in body" });
      return;
    }

    // Get user's IP address
    const ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "unknown";

    // Prepare event payload
    const newEvent: UserEventType = {
      ip,
      event,
      value: typeof value === "number" ? value : undefined,
    };

    // Save to MongoDB
    const saved = new UserEvent(newEvent);
    await saved.save();

    console.log("✅ Event saved:", newEvent);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to save event:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
