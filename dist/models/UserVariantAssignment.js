"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVariantAssignment = void 0;
// src\models\UserVariantAssignment.ts
const mongoose_1 = __importDefault(require("mongoose"));
const UserVarientAssignmentSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    variantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "HeroVariant", required: true },
    shownCount: { type: Number, default: 1 },
    lastShown: { type: Number, required: true },
});
exports.UserVariantAssignment = mongoose_1.default.model("UserVariantAssignment", UserVarientAssignmentSchema);
