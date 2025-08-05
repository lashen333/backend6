// src\models\Campaign.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICarouselImage {
  media?: string;
  description?: string;
  cta?: string;
}

export interface IAd extends Document {
  adId: string;
  name: string;
  status: string;
  headline?: string;
  cta?: string;
  imageUrl?: string;
  videoUrl?: string;
  carouselImages?: ICarouselImage[];
}

export interface IAdSet extends Document {
  adSetId: string;
  name: string;
  status: string;
  ads: IAd[];
}

export interface ICampaign extends Document {
  campaignId: string;
  name: string;
  status: string;
  adAccountId: string;
  adSets: IAdSet[];
}

const CarouselImageSchema = new Schema<ICarouselImage>({
  media: String,
  description: String,
  cta: String,
});

const AdSchema = new Schema<IAd>({
  adId: { type: String, required: true },
  name: String,
  status: String,
  headline: String,
  cta: String,
  imageUrl: String,
  videoUrl: String,
  carouselImages: [CarouselImageSchema],
});

const AdSetSchema = new Schema<IAdSet>({
  adSetId: { type: String, required: true },
  name: String,
  status: String,
  ads: [AdSchema],
});

const CampaignSchema = new Schema<ICampaign>({
  campaignId: { type: String, required: true },
  name: String,
  status: String,
  adAccountId: String,
  adSets: [AdSetSchema],
});

export const CampaignModel =
  mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);
