import mongoose from "mongoose";

export interface Roll {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  creator: string;
}

export const RollModel = mongoose.model(
  "Roll",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      imageURL: { type: String, required: true },
      creator: { type: String, required: true },
    },
    { versionKey: false }
  )
);
