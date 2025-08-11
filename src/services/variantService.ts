// src\services\variantService.ts
import { CampaignModel } from "../models/Campaign";
import { CampaignMap } from "../models/CampaignMap";

function normalizeAdCTA(adCTA?: string) {
  const map: Record<string, string> = {
    LEARN_MORE: "Learn More",
    SIGN_UP: "Sign Up",
    APPLY_NOW: "Apply Now",
    DOWNLOAD: "Download",
    CONTACT_US: "Contact Us",
    GET_OFFER: "Get Offer",
    SHOP_NOW: "Shop Now",
  };
  return adCTA ? (map[adCTA] || adCTA) : undefined;
}

export async function resolveHeroVariant({ ad_id, campaign_id }: { ad_id?: string; campaign_id?: string; }) {
  // 1) derive campaign from ad if needed + read CTA
  let resolvedCampaignId = campaign_id;
  let adCTA: string | undefined;
  if (ad_id) {
    const camp = await CampaignModel.findOne({ "adSets.ads.adId": ad_id }, { adSets: 1, campaignId: 1 }).lean();
    if (camp && !Array.isArray(camp)) {
      resolvedCampaignId = camp.campaignId;
      const ad = camp.adSets.flatMap((s: any) => s.ads).find((a: any) => a.adId === ad_id);
      adCTA = normalizeAdCTA(ad?.cta);
    }
  }
  if (!resolvedCampaignId) return { heroVariant: null };

  // 2) get campaign map
  const map = await CampaignMap.findOne({ campaignId: resolvedCampaignId }).lean();
  if (!map?.variants?.length) return { heroVariant: null };

  // Prefer variants targeted to this ad, then any with quota left
  const list = (ad_id ? map.variants.filter(v => v.asIds?.includes(ad_id)) : map.variants);
  const idx = list.findIndex(v => (v.shown ?? 0) < (v.limit ?? 3));

  // Nothing left under quota? fallback: return winner if set, else first
  if (idx === -1) {
    const winner = map.variants.find(v => v.contentId === map.winnerContentId) || map.variants[0];
    return { heroVariant: { ...winner, ctaText: adCTA || winner.ctaText }, campaignId: resolvedCampaignId };
  }

  // The chosen variant in original array index:
  const chosenContentId = list[idx].contentId;
  const realIndex = map.variants.findIndex(v => v.contentId === chosenContentId);

  // 3) atomically bump shown count
  await CampaignMap.updateOne(
    { _id: map._id },
    {
      $inc: { [`variants.${realIndex}.shown`]: 1 },
      $set: { [`variants.${realIndex}.lastServedAt`]: Date.now() }
    }
  );

  const chosen = map.variants[realIndex];
  return { heroVariant: { ...chosen, ctaText: adCTA || chosen.ctaText }, campaignId: resolvedCampaignId };
}
