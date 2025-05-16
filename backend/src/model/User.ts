import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  _id:ObjectId
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
