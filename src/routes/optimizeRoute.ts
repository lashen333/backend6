// src\routes\optimizeRoute.ts
import { Router, Request, Response } from "express";
import { userEvents } from "./trackRoute";

const router = Router();

router.get("/optimize-content", (req: Request, res: Response) => {
  const userIP = req.ip || "";
  const events = userEvents[userIP as string];

  // If no events, assume low engagement
  const shouldChange =
    !events || (!events.ctaClicked && events.stayTime < 5000);

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

  if (shouldChange) {
    res.json({
      variant: variants[1], // Changed version
      change: true,
    });
  } else {
    res.json({
      variant: variants[0], // Original version
      change: false,
    });
  }
});

export default router;
