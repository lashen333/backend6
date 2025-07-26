// src\index.ts
import express from "express";
import cors from "cors";
import trackRoute from "./routes/trackRoute";

import heroRoute from "./routes/heroRoute"; 
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import analyzeRoute from "./routes/analyzeRoute";
import analyzeGeoPerformance from "./routes/analyzeGeoPerformance";
import analyzeVisitsByHourRouter from "./routes/analyzeVisitsByHour";
import analyzeDeviceTypeRouter from "./routes/analyzeDeviceType";
import analyzeBrowserUsageRouter from "./routes/analyzeBrowserUsage";
import analyzeVisitsOverTimeRouter from "./routes/analyzeVisitsOverTime";
import analyzeEventFunnelRouter from "./routes/analyzeEventFunnel";


// 🔐 Load .env variables (MONGO_URI, PORT)
dotenv.config();

// 🚀 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error", err));


// 📦 Create Express app

const app = express();
const PORT = process.env.PORT || 5000;

// 🧠 Middlewares

app.use(cors());
app.use(express.json());

// 🔁 Routes

app.use("/api", trackRoute);
app.use("/api", heroRoute);


app.use("/api", analyzeRoute);
app.use("/api", analyzeGeoPerformance);
app.use("/api", analyzeVisitsByHourRouter);
app.use("/api", analyzeDeviceTypeRouter);
app.use("/api", analyzeBrowserUsageRouter);
app.use("/api", analyzeVisitsOverTimeRouter);
app.use("/api", analyzeEventFunnelRouter);

// 🚀 Start the server

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
