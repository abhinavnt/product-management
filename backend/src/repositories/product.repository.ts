import mongoose from "mongoose";
import { BaseRepository } from "../core/abstracts/base.repository";
import { IProductRepository } from "../core/interface/repository/IProductRepository";
import { IProduct, Product } from "../model/Product";
import { ProductCreationData } from "../services/product.service";

export class ProductRepository extends BaseRepository<IProduct> implements IProductRepository {
  constructor() {
    super(Product);
  }

  async createProduct(productData: ProductCreationData): Promise<IProduct> {
    const product = new this.model(productData);
    return await product.save();
  }

  async getProducts(page: number, perPage: number, subcategories: string[], search: string): Promise<{ products: IProduct[]; totalCount: number }> {
    const skip = (page - 1) * perPage;
    let query: any = {};

    if (subcategories.length > 0) {
      query.subcategory = { $in: subcategories };
    }

    if (search) {
      query.title = { $regex: search, $options: "i" }; // Case-insensitive search on title
    }

    const products = await Product.find(query).skip(skip).limit(perPage).exec();
    const totalCount = await Product.countDocuments(query).exec();
    return { products, totalCount };
  }

  async findProducts(query: any): Promise<IProduct[]> {
    return await Product.find(query).exec();
  }

  async findProductById(id: string): Promise<IProduct | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return Product.findById(id).populate("subcategory").exec();
  }
  async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.findByIdAndUpdate(new mongoose.Types.ObjectId(id), updateData, { new: true });
  }
}
