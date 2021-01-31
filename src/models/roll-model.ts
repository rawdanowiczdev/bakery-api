import mongoose from "mongoose";

const rollSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    imageURL: String,
  },
  { versionKey: false }
);

export const Roll = mongoose.model("Roll", rollSchema);
