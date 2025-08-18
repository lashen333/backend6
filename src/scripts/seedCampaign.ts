// src\scripts\seedCampaign.ts

import mongoose from "mongoose";
import { CampaignMap } from "../models/CampaignMap";
import { env } from "../config/env";

mongoose.connect(env.mongoUri!).then(async () => {
  await CampaignMap.create({
    campaignId: "ai_signup",
    name: "AI Bootcamp Signup",
    intent: "event_signup",
    targetAudience: "beginner marketers",
    variants: [
      {
        contentId: "variant_1",
        title: "Join the AI Bootcamp Today",
        subtitle: "Master AI skills and grow your career.",
        ctaText: "Sign Up Now",
        
      },
      {
        contentId: "variant_2",
        title: "Launch Your AI Journey",
        subtitle: "From zero to expert in 30 days.",
        ctaText: "Enroll Free",
        
      }
    ],
  });

  console.log("✅ Campaign data seeded.");
  process.exit();
});
