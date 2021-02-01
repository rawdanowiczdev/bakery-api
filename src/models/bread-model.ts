import mongoose, { ObjectId } from "mongoose";

export interface Bread {
  _id: ObjectId;
  name: string;
  description: string;
  grains: string[];
  imageURL: string;
}

export const BreadModel = mongoose.model(
  "Bread",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      grains: Array,
      imageURL: String,
    },
    { versionKey: false }
  )
);
