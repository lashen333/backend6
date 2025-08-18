// src\middlewares\rateLimit.ts
import { RateLimiterMemory } from "rate-limiter-flexible";
import { RequestHandler } from "express";

const limiter = new RateLimiterMemory({ points: 200, duration: 60 }); // 200 req/min per IP

export const rateLimit: RequestHandler = async (req, res, next) => {
  try {
    await limiter.consume(req.ip ?? "unknown-ip");
    next();
  } catch {
    res.status(429).json({ error: "TooManyRequests" });
  }
};
