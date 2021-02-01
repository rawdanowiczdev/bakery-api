import mongoose, { ObjectId } from "mongoose";

export interface Roll {
  _id: ObjectId;
  name: string;
  description: string;
  grains: string[];
  imageURL: string;
}

export const RollModel = mongoose.model(
  "Roll",
  new mongoose.Schema(
    {
      name: String,
      description: String,
      imageURL: String,
    },
    { versionKey: false }
  )
);
