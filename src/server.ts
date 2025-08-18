// src\server.ts
import mongoose from "mongoose";
import app from "./app";
import { env } from "./config/env";

async function start() {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("✅ MongoDB connected");

    app.listen(env.port, () => {
      console.log(`✅ Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

start();
