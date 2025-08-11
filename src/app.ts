// src\app.ts

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

// Routes
import trackRoute from "./routes/trackRoute";
import heroRoute from "./routes/heroRoute";
import analyzeRoute from "./routes/analyzeRoute";

import whyOptimizeRoutes from "./routes/whyOptimizeRoutes";
import facebookAuthRoute from "./routes/facebookAuthRoute";
import campaignRoutes from "./routes/campaignRoutes";

import variantResolveRoutes from "./routes/variantResolveRoutes";

// 🔐 Load env variables
dotenv.config();

// 🔌 Connect to MongoDB (only once, here)
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));

// 📦 Create Express app
const app = express();

// 🧠 Middlewares
app.use(cors());
app.use(express.json());

// 🔁 Routes
app.use("/api", trackRoute);
app.use("/api", heroRoute);
app.use("/api", analyzeRoute);

// Second section Routes
app.use("/api", whyOptimizeRoutes);
// Facebook authentication route
app.use("/api", facebookAuthRoute);
// Campaign routes
app.use("/api", campaignRoutes);
// Campaign Variant
app.use("/api", variantResolveRoutes);

// Export app to be used in server or tests
export default app;
