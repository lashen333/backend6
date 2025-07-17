"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromIP = getUserIdFromIP;
// src\utils\getUserIdFromIP.ts
const crypto_1 = __importDefault(require("crypto"));
function getUserIdFromIP(ip) {
    return crypto_1.default.createHash("sha256").update(ip).digest("hex");
}
