import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  subcategory: mongoose.Types.ObjectId;
  variants: Array<{
    ram: string;
    price: number;
    quantity: number;
  }>;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    title: String,
    description: String,
    subcategory: { type: Schema.Types.ObjectId, ref: "Category" },
    variants: [
      {
        ram: String,
        price: Number,
        quantity: Number,
      },
    ],
    images: [String],
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
