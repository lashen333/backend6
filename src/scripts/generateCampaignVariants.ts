// src\scripts\generateCampaignVariants.ts
import "dotenv/config";
import OpenAI from "openai";
import mongoose from "mongoose";
import { CampaignModel, ICampaign, IAdSet } from "../models/Campaign";
import { CampaignMap } from "../models/CampaignMap";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

function mapAdCtaToCopy(t?: string) {
  const map: Record<string, string> = {
    LEARN_MORE: "Learn More",
    SIGN_UP: "Sign Up",
    APPLY_NOW: "Apply Now",
    DOWNLOAD: "Download",
    CONTACT_US: "Contact Us",
    GET_OFFER: "Get Offer",
    SHOP_NOW: "Shop Now",
  };
  if (!t) return "Learn More";
  return map[t] || t.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}

// robust JSON extraction (handles ```json fences)
function parseVariants(raw: string) {
  const cleaned = raw
    .replace(/```json\s*/gi, "")
    .replace(/```\s*$/gi, "")
    .trim();
  try {
    const data = JSON.parse(cleaned) as { variants?: Array<{ title: string; subtitle: string; ctaText: string }> };
    if (!data.variants?.length) throw new Error("No variants field");
    return data.variants;
  } catch (e) {
    throw new Error("Model did not return valid JSON.");
  }
}

async function main(campaignId: string) {
  if (!campaignId) throw new Error("Pass campaignId: `ts-node src/scripts/generateCampaignVariants.ts <id>`");
  await mongoose.connect(process.env.MONGO_URI!);

  // 1) Pull the campaign as a POJO with correct type
  const campaign = await CampaignModel.findOne({ campaignId }).lean<ICampaign>().exec();
  if (!campaign) throw new Error("Campaign not found");

  const allAds = campaign.adSets.flatMap((s: IAdSet) => s.ads);
  if (!allAds.length) throw new Error("No ads under this campaign");

  const ad = allAds[0]; // or choose by adId param
  const humanCTA = mapAdCtaToCopy(ad.cta);

  // 2) Ask OpenAI for 10 variants in strict JSON
  const prompt = `
You are a CRO copywriter. Create 10 landing hero variants that tightly match this ad:

Ad Name: ${ad.name}
Ad CTA: ${humanCTA}
Image: ${ad.imageUrl ?? "N/A"}
Headline (if any): ${ad.headline ?? ""}

Return JSON with this exact shape and NOTHING ELSE:
{
  "variants": [
    { "title": "...", "subtitle": "...", "ctaText": "${humanCTA}" },
    ...
  ]
}
Rules:
- EXACTLY 10 items.
- Keep title punchy (<= 9 words).
- Subtitle 1–2 short sentences focused on the same promise as the ad.
- CTA TEXT MUST be "${humanCTA}" to match message.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [
      { role: "system", content: "You write high-converting, on-message landing page copy." },
      { role: "user", content: prompt },
    ],
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";
  const variantsFromAI = parseVariants(raw);

  // 3) Upsert into CampaignMap
  const variants = variantsFromAI.map(v => ({
    ...v,
    adIds: [ad.adId],
    limit: 3,
    shown: 0,
  }));

  await CampaignMap.updateOne(
    { campaignId },
    {
      $setOnInsert: {
        campaignId,
        name: campaign.name,
        intent: "Auto-generated from ad",
        targetAudience: "",
      },
      $push: { variants: { $each: variants } },
    },
    { upsert: true }
  );

  console.log(`Saved ${variants.length} variants to CampaignMap for ${campaignId}`);
  await mongoose.disconnect();
}

main(process.argv[2]!).catch(e => {
  console.error(e);
  process.exit(1);
});
