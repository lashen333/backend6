// src\services\generateWhyOptimizeVariants.ts
import OpenAI from "openai";
import { WhyOptimizeVariant } from "../models/WhyOptimizeVariant";
import * as dotenv from "dotenv";
dotenv.config();

console.log("🔑 API Key:", process.env.OPENAI_API_KEY?.slice(0, 8));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAndSaveWhyOptimizeVariants(count = 10) {
  const prompt = `Generate ${count} unique variants for a section called "Why Landing Page Optimization?".
Each variant must contain 4 boxes horizontally, each with:
1. A short heading (max 8 words)
2. A description (max 20 words)
Format it as JSON array: [
  {
    "title": "Why Landing Page Optimization?",
    "boxes": [
      { "heading": "Fast Load Times", "description": "Pages load quickly to retain visitors" },
      { "heading": "Improved Conversions", "description": "Better UX increases sales and signups" },
      { "heading": "SEO Benefits", "description": "Optimized pages rank higher on search engines" },
      { "heading": "Better User Experience", "description": "Smoother navigation keeps users engaged" }
    ]
  }
]`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = response.choices[0].message?.content || "[]";

    let variants: any[] = [];
    try {
      variants = JSON.parse(text);
    } catch (err) {
      console.error("❌ Failed to parse OpenAI response as JSON");
      console.log("Raw text:", text);
      return;
    }

    // Clear old variants (optional)
    await WhyOptimizeVariant.deleteMany({});

    // Save new variants
    for (const variant of variants) {
      const newVariant = new WhyOptimizeVariant(variant);
      await newVariant.save();
      console.log("✅ Saved Variant:", variant.title);
    }

    console.log(`🎉 Successfully saved ${variants.length} WhyOptimize variants`);
  } catch (error) {
    console.error("❌ Error generating variants:", error);
  }
}
