import mongoose from "mongoose";

export interface Bread {
  _id: string;
  name: string;
  description: string;
  grains: string[];
  imageURL: string;
  creator: string;
}

export const BreadModel = mongoose.model(
  "Bread",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      grains: { type: Array, required: true },
      imageURL: { type: String, required: true },
      creator: { type: String, required: true },
    },
    { versionKey: false }
  )
);
