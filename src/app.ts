// src\app.ts
import "express-async-errors";
import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import pinoHttp from "pino-http";

import { env } from "./config/env";
import { logger } from "./config/logger";
import { rateLimit } from "./middlewares/rateLimit";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/error";

// Routes
import trackRoute from "./routes/trackRoute";
import heroRoute from "./routes/heroRoute";
import analyzeRoute from "./routes/analyzeRoute";
import whyOptimizeRoutes from "./routes/whyOptimizeRoutes";
import facebookAuthRoute from "./routes/facebookAuthRoute";
import campaignRoutes from "./routes/campaignRoutes";
import variantResolveRoutes from "./routes/variantResolveRoutes";

const app = express();

// If behind a proxy (Railway/Vercel/Nginx/Cloudflare), this makes req.ip & HTTPS detection correct
app.set("trust proxy", true);

// Security & perf
app.use(helmet());
app.use(compression());

// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// Logging (human-readable in dev, Apache combined in prod)
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));
// Structured JSON logs (production-friendly)
app.use(pinoHttp({ logger }));

// CORS: allow only whitelisted origins (or default to localhost:3000 if none provided)
app.use(
  cors({
    origin(origin, cb) {
      // allow tools like curl/postman (no Origin header)
      if (!origin) return cb(null, true);

      const allow =
        env.allowedOrigins.length === 0
          ? ["http://localhost:3000"]
          : env.allowedOrigins;

      if (allow.includes(origin)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
  }),
);

// Global rate limit
app.use(rateLimit);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Route mounts (kept as-is)
app.use("/api", trackRoute);
app.use("/api", heroRoute);
app.use("/api", analyzeRoute);
app.use("/api", whyOptimizeRoutes);
app.use("/api", facebookAuthRoute);
app.use("/api", campaignRoutes);
app.use("/api", variantResolveRoutes);

// 404 and error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
