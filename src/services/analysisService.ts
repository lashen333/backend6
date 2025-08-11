// src\services\analysisService.ts
// src/services/analysisService.ts
import { UserVariantEvent } from "../models/UserVariantEvent";
import { CampaignMap } from "../models/CampaignMap";

export async function pickWinnerForCampaign(campaignId: string) {
  // compute CTR per contentId
  const clicks = await UserVariantEvent.aggregate([
    { $match: { event: "cta_click" } },
    { $group: { _id: "$value.contentId", clicks: { $sum: 1 } } }
  ]);
  const imps = await UserVariantEvent.aggregate([
    { $match: { event: "impression" } },
    { $group: { _id: "$value.contentId", imps: { $sum: 1 } } }
  ]);

  const impMap = new Map(imps.map(i => [i._id, i.imps]));
  const scored = clicks.map(c => {
    const i = impMap.get(c._id) || 0;
    return { contentId: c._id, ctr: i ? c.clicks / i : 0 };
  }).sort((a,b) => b.ctr - a.ctr);

  const winner = scored[0];
  if (!winner) return null;

  await CampaignMap.updateOne({ campaignId }, { $set: { winnerContentId: winner.contentId } });
  return winner;
}
