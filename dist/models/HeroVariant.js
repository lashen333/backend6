"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroVariant = void 0;
// src\models\HeroVariant.ts
const mongoose_1 = __importDefault(require("mongoose"));
const heroVariantSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    ctaText: { type: String, required: true },
}, { timestamps: true });
exports.HeroVariant = mongoose_1.default.model("HeroVariant", heroVariantSchema);
