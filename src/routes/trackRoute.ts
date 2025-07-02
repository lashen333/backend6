// src\routes\trackRoute.ts
import { Router, Request, Response } from "express";

const router = Router();

// Store events per session/IP temporarily
const userEvents: Record<string, { ctaClicked: boolean; stayTime: number }> = {};

router.post("/track", (req: Request, res: Response) => {
  const { event, value } = req.body;
  const userIP = req.ip || "unknown";

  if (!userEvents[userIP]) {
    userEvents[userIP] = {
      ctaClicked: false,
      stayTime: 0,
    };
  }

  if (event === "cta_click") {
    userEvents[userIP].ctaClicked = true;
  } else if (event === "stay_time") {
    userEvents[userIP].stayTime = value;
  }

  console.log("📦 User event stored:", userIP, userEvents[userIP]);

  res.status(200).json({ success: true });
});

export { userEvents }; // Export for use in optimize route
export default router;
