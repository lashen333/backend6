// src\utils\getUserIdFromIP.ts

import crypto from "crypto";

export function getUserIdFromIP(ip: string): string {
  // You can hash the IP for some privacy
  return crypto.createHash("sha256").update(ip).digest("hex");
}
