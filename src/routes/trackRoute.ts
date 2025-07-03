// src\routes\trackRoute.ts
import { Router, Request, Response } from "express";
import { UserEvent } from "../models/UserEvent";
import { TrackEventBody } from "../types/TrackEvent.types";


const router = Router();

router.post("/track", async (req: Request<{}, {}, TrackEventBody>, res: Response) => {
  const { event, value } = req.body;
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "") as string;

  try {
    const eventData:any = {ip, event };

    if (value !== undefined && !isNaN(Number(value))) {
      eventData.value = Number(value);

    }

    const newEvent = new UserEvent(eventData);
    await newEvent.save();

    console.log("✅ Event saved to MongoDB:",  eventData);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Failed to save event:", err);
    res.status(500).json({ success: false, error: "Failed to save event" });
  }
});

export default router;
