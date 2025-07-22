"use strict";
// src\utils\getUserIdFromIP.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromIP = getUserIdFromIP;
const crypto_1 = __importDefault(require("crypto"));
function getUserIdFromIP(ip) {
    // You can hash the IP for some privacy
    return crypto_1.default.createHash("sha256").update(ip).digest("hex");
}
