// src\models\HeroVariant.ts
import mongoose from "mongoose";
import { HeroVariantType } from "../types/HeroVariant.types";

const heroVariantSchema = new mongoose.Schema<HeroVariantType>(
    {
        title:{type:String,required:true},
        subtitle:{type:String,required:true},
        ctaText:{type:String,required:true},
    },
    {timestamps:true}
);

export const HeroVariant = mongoose.model("HeroVariant", heroVariantSchema);