// src\generate.ts
// src/generate.ts (optional one-time runner)
import mongoose from "mongoose";
import { generateAndSaveVariants } from "./services/generateVariants";
import * as dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await generateAndSaveVariants(10);
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ DB error", err));
