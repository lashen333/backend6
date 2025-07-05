// src\models\UserVariantAssignment.ts
import mongoose from "mongoose";

const UserVarientAssignmentSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    variantId: {type:mongoose.Schema.Types.ObjectId, ref:"HeroVariant", required:true},
    shownCount: {type:Number, default:1},
    lastShown: {type:Number, required:true},
});

export const UserVariantAssignment = mongoose.model("UserVariantAssignment", UserVarientAssignmentSchema);