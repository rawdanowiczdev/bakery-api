import mongoose from "mongoose";

const breadSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    grains: Array,
    imageURL: String,
  },
  { versionKey: false }
);

export const Bread = mongoose.model("Bread", breadSchema);
