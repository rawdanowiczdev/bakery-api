import mongoose, { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId;
  email: string;
}

export const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
    },
    { versionKey: false }
  )
);
