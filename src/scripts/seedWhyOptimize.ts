// src\scripts\seedWhyOptimize.ts
import mongoose from "mongoose";
import { WhyOptimizeVariant } from "../models/WhyOptimizeVariant";
import * as dotenv from "dotenv";
dotenv.config();

const data = [
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Boost Conversion Rates", description: "Optimized pages convert more visitors into customers consistently." },
      { heading: "Improve User Experience", description: "A clean, fast layout makes users stay longer and engage more." },
      { heading: "Enhance Brand Credibility", description: "High-quality pages build trust and showcase professionalism." },
      { heading: "Lower Ad Costs", description: "Better performance improves ad quality scores and reduces spend." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Maximize ROI", description: "Each visitor is more likely to buy, boosting returns on ad spend." },
      { heading: "Faster Load Times", description: "Quick pages keep users engaged and reduce bounce rates." },
      { heading: "SEO Performance", description: "Optimized pages rank higher in search engines naturally." },
      { heading: "Better Mobile Experience", description: "Mobile-friendly layouts reach more users on all devices." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Capture More Leads", description: "Well-structured pages encourage users to fill forms or sign up." },
      { heading: "Increase Revenue", description: "More conversions translate directly into more sales." },
      { heading: "Stronger Engagement", description: "Relevant content keeps visitors scrolling and clicking." },
      { heading: "Outperform Competitors", description: "A/B tested pages help you stay ahead in your market." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Reduce Bounce Rates", description: "Clear messaging makes users stay instead of leaving immediately." },
      { heading: "Data-Driven Decisions", description: "Track user behavior and refine content for better results." },
      { heading: "Increase Customer Trust", description: "Polished design builds credibility with potential buyers." },
      { heading: "Boost Long-Term Growth", description: "Every improvement compounds for lasting success." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Deliver Relevant Content", description: "Personalized experiences make users feel understood." },
      { heading: "Improve Conversion Funnels", description: "Optimized pages guide users toward taking action." },
      { heading: "Support Marketing Campaigns", description: "Better pages make ads more effective and measurable." },
      { heading: "Build Brand Loyalty", description: "Positive user experience encourages repeat visits." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Turn Clicks Into Customers", description: "Engaging layouts and CTAs drive users to purchase." },
      { heading: "Enhance Visual Appeal", description: "Attractive designs create a strong first impression." },
      { heading: "Gain Valuable Insights", description: "Test elements and analyze performance metrics easily." },
      { heading: "Improve Accessibility", description: "Accessible pages reach more diverse audiences." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Reduce Marketing Waste", description: "More efficient pages mean fewer lost opportunities." },
      { heading: "Enhance Content Clarity", description: "Concise messaging avoids confusion and increases action." },
      { heading: "Leverage Social Proof", description: "Testimonials and reviews build instant trust." },
      { heading: "Drive Repeat Traffic", description: "Optimized pages encourage users to return often." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Shorten Decision Time", description: "Users act faster when information is clear and simple." },
      { heading: "Make CTAs Stand Out", description: "Bold call-to-actions guide users effectively." },
      { heading: "Optimize Every Device", description: "Responsive designs adapt perfectly on mobile and desktop." },
      { heading: "Strengthen Brand Message", description: "Consistent visuals and tone reinforce your value." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Win More Customers", description: "Better design and flow turn casual visitors into buyers." },
      { heading: "Increase Ad Efficiency", description: "Optimized pages help ad campaigns convert better." },
      { heading: "Provide Better Insights", description: "Testing reveals what resonates with your audience." },
      { heading: "Scale Growth Faster", description: "Higher conversion rates unlock more opportunities." }
    ]
  },
  {
    title: "Why Landing Page Optimization?",
    boxes: [
      { heading: "Drive More Revenue", description: "Every percentage increase in conversions boosts sales." },
      { heading: "Showcase Value Clearly", description: "Clear benefits reduce hesitation and increase action." },
      { heading: "Remove Friction Points", description: "Simplified navigation makes it easy to convert." },
      { heading: "Support Business Goals", description: "Optimized pages align with broader marketing strategy." }
    ]
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("📦 Connected to MongoDB Atlas");

    await WhyOptimizeVariant.deleteMany({});
    console.log("🗑️ Cleared old variants");

    await WhyOptimizeVariant.insertMany(data);
    console.log(`✅ Inserted ${data.length} WhyOptimize variants`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  }
}

run();
