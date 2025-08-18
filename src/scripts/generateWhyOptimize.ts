// src\scripts\generateWhyOptimize.ts
import mongoose from "mongoose";
import { generateAndSaveWhyOptimizeVariants } from "../services/generateWhyOptimizeVariants";
import {env} from "../config/env";


async function run() {
  await mongoose.connect(env.mongoUri);
  console.log("📦 Connected to MongoDB");

  await generateAndSaveWhyOptimizeVariants(10);

  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
}

run();
