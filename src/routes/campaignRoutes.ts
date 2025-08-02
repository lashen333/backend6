// src\routes\campaignRoutes.ts
import { Router } from "express";
import { CampaignModel } from "../models/Campaign";

const router = Router();

/**
 * GET /api/campaigns
 * Fetch all campaigns for a specific ad account
 */
router.get("/campaigns", async (req, res): Promise<void> => {
  try {
    const adAccountId = req.query.adAccountId as string;

    if (!adAccountId) {
      res.status(400).json({ error: "adAccountId is required" });
      return;
    }

    const campaigns = await CampaignModel.find({ adAccountId }).lean();
    res.json(campaigns);
  } catch (error: any) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

/**
 * GET /api/campaigns/:id
 * Fetch a single campaign by its ID
 */
router.get("/campaigns/:id", async (req, res): Promise<void> => {
  try {
    const campaignId = req.params.id;

    const campaign = await CampaignModel.findOne({ campaignId }).lean();

    if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
    }

    res.json(campaign);
  } catch (error: any) {
    console.error("Error fetching campaign:", error);
    res.status(500).json({ error: "Failed to fetch campaign" });
  }
});

export default router;
