// src\models\WhyOptimizeVariant.ts
import mongoose from "mongoose";

const BoxSchema = new mongoose.Schema({
  heading: String,
  description: String,
  icon: String, // optional: icons if needed
});

const WhyOptimizeVariantSchema = new mongoose.Schema({
  title: String, // optional overall section heading
  boxes: [BoxSchema], // 4 boxes horizontally
}, { timestamps: true });

export const WhyOptimizeVariant = mongoose.model(
  "WhyOptimizeVariant",
  WhyOptimizeVariantSchema
);
