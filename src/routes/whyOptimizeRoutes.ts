import { Router } from "express";
import { WhyOptimizeVariant } from "../models/WhyOptimizeVariant";
import { UserWhyOptimizeEvent } from "../models/UserWhyOptimizeEvent";

const router = Router();

// Get a random variant
router.get("/get-why-optimize", async (req, res) => {
  const variants = await WhyOptimizeVariant.find({});
  const variant = variants[Math.floor(Math.random() * variants.length)];
  res.json(variant);
});

// Track events
router.post("/track-why-optimize", async (req, res) => {
  await UserWhyOptimizeEvent.create(req.body);
  res.json({ success: true });
});

export default router;
