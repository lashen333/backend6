// src\routes\facebookAuthRoute.ts
import { Router, Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { CampaignModel } from "../models/Campaign";

dotenv.config();

const router = Router();

const FB_APP_ID = process.env.FB_APP_ID!;
const FB_APP_SECRET = process.env.FB_APP_SECRET!;
const FB_REDIRECT_URI = process.env.FB_REDIRECT_URI!;
const FRONTEND_URL = process.env.FRONTEND_URL!; 

/**
 * STEP 1: Redirect user to Facebook login
 */
router.get("/auth/facebook", (req: Request, res: Response) => {
  const authUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
    FB_REDIRECT_URI
  )}&scope=ads_read,ads_management,pages_read_engagement`;
  res.redirect(authUrl);
});

/**
 * STEP 2: Facebook redirects to our callback with a code
 */
router.get("/auth/facebook/callback", async (req: Request, res: Response) => {
  const code = req.query.code;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.get(
      `https://graph.facebook.com/v19.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
        FB_REDIRECT_URI
      )}&client_secret=${FB_APP_SECRET}&code=${code}`
    );

    const accessToken = tokenResponse.data.access_token;

    // Fetch user's ad accounts with names
    const accountsResponse = await axios.get(
      `https://graph.facebook.com/v19.0/me/adaccounts?fields=id,account_id,name&access_token=${accessToken}`
    );

    const adAccounts = accountsResponse.data.data;

    // Redirect back to frontend with token and ad accounts
    const accountsParam = encodeURIComponent(JSON.stringify(adAccounts));
    res.redirect(
      `${FRONTEND_URL}/connect?accessToken=${accessToken}&adAccounts=${accountsParam}`
    );
  } catch (error: any) {
    console.error(
      "Error during Facebook OAuth:",
      error.response?.data || error
    );
    res.status(500).json({ error: "Facebook authentication failed" });
  }
});

/**
 * STEP 3: Fetch campaigns, ad sets, and ads using single nested Graph API request
 */
router.post(
  "/facebook/fetch-ads",
  async (req: Request, res: Response): Promise<void> => {
    const { accessToken, adAccountId } = req.body;

    if (!accessToken || !adAccountId) {
      res.status(400).json({ error: "Missing accessToken or adAccountId" });
      return;
    }

    try {
      // Clear old data for this ad account (optional, ensures fresh data)
      await CampaignModel.deleteMany({ adAccountId });

      // Single nested Graph API request for campaigns -> ad sets -> ads -> creatives
      const url = `https://graph.facebook.com/v19.0/${adAccountId}?fields=campaigns{id,name,status,adsets{id,name,status,ads{id,name,status,creative{object_story_spec,call_to_action_type}}}}&access_token=${accessToken}`;

      const response = await axios.get(url);

      const campaigns = response.data.campaigns?.data || [];

      for (const campaign of campaigns) {
        const adSets: any[] = [];

        for (const adSet of campaign.adsets?.data || []) {
          const ads: any[] = [];

          for (const ad of adSet.ads?.data || []) {
            const creative = ad.creative || {};
            const linkData = creative.object_story_spec?.link_data || {};

            ads.push({
              adId: ad.id,
              name: ad.name,
              status: ad.status,
              headline: linkData.message || "",
              cta: linkData.call_to_action?.type || "",
              imageUrl: linkData.picture || linkData.image_url || "",
            });
          }

          adSets.push({
            adSetId: adSet.id,
            name: adSet.name,
            status: adSet.status,
            ads,
          });
        }

        // Save campaign with ad sets and ads into MongoDB
        await CampaignModel.create({
          campaignId: campaign.id,
          name: campaign.name,
          status: campaign.status,
          adAccountId,
          adSets,
        });
      }

      res.json({ message: "Campaigns, ad sets, and ads saved successfully!" });
    } catch (error: any) {
      console.error(
        "Error fetching campaigns with nested query:",
        error.response?.data || error
      );
      res.status(500).json({ error: "Failed to fetch campaigns/ads" });
    }
  }
);



export default router;
