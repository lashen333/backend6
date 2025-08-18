// src\config\env.ts
import dotenv from "dotenv";
import dotenvSafe from "dotenv-safe";

// Load .env file from project root
dotenv.config();
dotenvSafe.config({ allowEmptyValues: false });

function toNumber(v: string | undefined, fallback: number) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: toNumber(process.env.PORT, 5000),

  // Required
  mongoUri: process.env.MONGO_URI!,

  // Optional
  openaiKey: process.env.OPENAI_API_KEY ?? "",

  // Allowed origins (comma separated list in .env)
  allowedOrigins: (process.env.ALLOWED_ORIGINS ?? process.env.FRONTEND_URL ?? "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean),

  // Facebook keys
  fb: {
    appId: process.env.FB_APP_ID ?? "",
    appSecret: process.env.FB_APP_SECRET ?? "",
    redirectUri: process.env.FB_REDIRECT_URI ?? "",
  },

  //geo keys
  geo: {
    opencageKey: process.env.OPENCAGE_KEY ?? "",
    ipinfoToken: process.env.IPINFO_TOKEN ?? "",
  },

};
