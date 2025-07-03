// src\routes\optimizeRoute.ts
import { Router, Request, Response } from "express";
import { UserEvent } from "../models/UserEvent";
import {OptimizeContentResponse} from "../types/OptimizeContent.types";

const router = Router();

router.get("/optimize-content", async (req: Request, res: Response<OptimizeContentResponse>) => {
  const ip = req.ip;

  const recentEvents = await UserEvent.find({ ip }).sort({ timestamp: -1 }).limit(10);

  let clicked = false;
  let shortStay = false;

  for (const e of recentEvents) {
    if (e.event === "cta_click") clicked = true;
    if (e.event === "stay_time" && e.value && e.value < 5000) shortStay = true;
  }

  const shouldChange = !clicked && shortStay;

  const variants = [
    {
      title: "Unlock More Sales with Our Tools",
      subtitle: "Boost your conversion rates using smart optimization",
      ctaText: "Try It Free",
    },
    {
      title: "Struggling to Convert Visitors?",
      subtitle: "Let AI help you rewrite and improve your landing pages",
      ctaText: "Boost My Conversions",
    },
  ];

  res.json({
    variant: shouldChange ? variants[1] : variants[0],
    change: shouldChange,
  });

  });

export default router;
