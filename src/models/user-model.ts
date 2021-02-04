import mongoose from "mongoose";

export interface User {
  _id: string;
  email: string;
  password: string;
}

export const UserModel = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { versionKey: false }
  )
);
