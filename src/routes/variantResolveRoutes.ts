// src\routes\variantResolveRoutes.ts

import { Router, Request, Response, NextFunction } from "express";
import { resolveHeroVariant } from "../services/variantService";
const router = Router();

router.get("/variants/resolve", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { ad_id, campaign_id } = req.query as { ad_id?: string; campaign_id?: string };
        const result = await resolveHeroVariant({ ad_id, campaign_id });
        if (!result.heroVariant) {
            res.status(404).json({ error: "No variant found" });
            return;

        }
        res.json(result);
    } catch (err) {
        next(err);
    }
});
export default router;
