import mongoose, { Document, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String, default: () => uuidv4().replace(/-/g, ""), unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
