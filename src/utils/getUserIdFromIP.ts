// src\utils\getUserIdFromIP.ts
import crypto from "crypto";

export function getUserIdFromIP(ip: string): string{
    return crypto.createHash("sha256").update(ip).digest("hex");
}