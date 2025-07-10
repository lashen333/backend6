// src\routes\heroRoute.ts
import { Router, Request, Response } from "express";
import{ HeroVariant } from "../models/HeroVariant";
import{ UserVariantAssignment } from "../models/UserVariantAssignment";
import{ getUserIdFromIP } from "../utils/getUserIdFromIP";
import { CampaignMap} from "../models/CampaignMap";

const router = Router();

router.get("/get-hero", async (req: Request, res: Response): Promise<void> => {
    try{
        const ip = req.headers["x-forwarded-for"] as string || req.socket.remoteAddress || "unknown";
        const userId = getUserIdFromIP(ip);

        //🧠 Step 1: Check UTM params from query
        const utm_campaign = req.query.utm_campaign as string;
        const utm_content = req.query.utm_content as string;

        if (utm_campaign && utm_content) {
            const campaign = await CampaignMap.findOne({ campaignId: utm_campaign });

            if (!campaign) {
                res.status(404).json({ error: "Campaign not found" });
                return;
            }

            const variant = campaign.variants.find((v) => v.contentId === utm_content);
      if (!variant) {
        res.status(404).json({ error: "Variant not found" });
        return;
      }

      res.status(200).json({
        title: variant.title,
        subtitle: variant.subtitle,
        ctaText: variant.ctaText,
        variantId: `${utm_campaign}_${utm_content}`, // Trackable ID
      });
      return;
    }

        //Find existing assignment
        const existing = await UserVariantAssignment.findOne({ userId }).populate("variantId");

        if (existing && existing.shownCount < 2) {
            //Update shown count
            existing.shownCount += 1;
            existing.lastShown = Date.now();
            await existing.save();
            res.status(200).json(existing.variantId);
            return;
        }

        //Get all variants
        const allVariants = await HeroVariant.find();
        if (!allVariants.length) {
            res.status(404).json({ error: "No variants found" });
            return;
        }

        //Pick a random variant
        const random = allVariants[Math.floor(Math.random() * allVariants.length)];

        //Create new assignment
        const assignment = new UserVariantAssignment({
            userId,
            variantId: random._id,
            shownCount: 1,
            lastShown: Date.now(),
        });

        await assignment.save();
        
        res.status(200).json(random);
    }catch (err){
        console.error("❌ Failed to fetch hero variant:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;