// src\scripts\generateWhyOptimize.ts
import mongoose from "mongoose";
import { generateAndSaveWhyOptimizeVariants } from "../services/generateWhyOptimizeVariants";
import * as dotenv from "dotenv";
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("📦 Connected to MongoDB");

  await generateAndSaveWhyOptimizeVariants(10);

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
}

run();
