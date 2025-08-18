// src\services\generateVariants.ts


import OpenAI from "openai";
import { HeroVariant } from "../models/HeroVariant";
import { HeroVariantType } from "../types/HeroVariant.types";
import {env} from "../config/env";

const openai = new OpenAI({
  apiKey: env.openaiKey,
});

export async function generateAndSaveVariants(count = 10) {
  const prompt = `Generate ${count} unique hero section ideas for a CRO landing page.
Each should include:
1. A powerful H1 title
2. A supportive subtitle
3. A strong CTA button text
Format it as JSON array: [{ title, subtitle, ctaText }]`;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const text = response.choices[0].message?.content || "[]";
  let variants: HeroVariantType[];

  try {
    variants = JSON.parse(text);
  } catch (err) {
    console.error("❌ Failed to parse OpenAI response as JSON");
    console.log("Raw text:", text);
    return;
  }

  for (const variant of variants) {
    const newVariant = new HeroVariant(variant);
    await newVariant.save();
    console.log("✅ Saved Variant:", variant.title);
  }
}
