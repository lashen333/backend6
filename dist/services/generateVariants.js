"use strict";
// src\services\generateVariants.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAndSaveVariants = generateAndSaveVariants;
const openai_1 = __importDefault(require("openai"));
const HeroVariant_1 = require("../models/HeroVariant");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
async function generateAndSaveVariants(count = 10) {
    const prompt = `Generate ${count} unique hero section ideas for a CRO landing page.
Each should include:
1. A powerful H1 title
2. A supportive subtitle
3. A strong CTA button text
Format it as JSON array: [{ title, subtitle, ctaText }]`;
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
    });
    const text = response.choices[0].message?.content || "[]";
    let variants;
    try {
        variants = JSON.parse(text);
    }
    catch (err) {
        console.error("❌ Failed to parse OpenAI response as JSON");
        console.log("Raw text:", text);
        return;
    }
    for (const variant of variants) {
        const newVariant = new HeroVariant_1.HeroVariant(variant);
        await newVariant.save();
        console.log("✅ Saved Variant:", variant.title);
    }
}
