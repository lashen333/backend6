// src\models\UserWhyOptimizeAssignment.ts
import mongoose from "mongoose";

const UserWhyOptimizeAssignmentSchema = new mongoose.Schema({
  userId: String,
  variantId: mongoose.Schema.Types.ObjectId,
  shownCount: Number
});

export const UserWhyOptimizeAssignment = mongoose.model(
  "UserWhyOptimizeAssignment",
  UserWhyOptimizeAssignmentSchema
);
