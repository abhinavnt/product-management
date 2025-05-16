import { inject, injectable } from "inversify";
import { IProductService } from "../core/interface/service/IProductService";
import { TYPES } from "../di/types";
import { IProductRepository } from "../core/interface/repository/IProductRepository";
import { ICategoryRepository } from "../core/interface/repository/ICategoryRepository";
import { IProduct } from "../model/Product";
import mongoose from "mongoose";

export interface ProductCreationData {
  title: string;
  description: string;
  subcategory: mongoose.Types.ObjectId;
  variants: Array<{ ram: string; price: number; quantity: number }>;
  images: string[];
}

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject(TYPES.ProductRepository) private productRepository: IProductRepository,
    @inject(TYPES.CategoryRepository) private categoryRepository: ICategoryRepository
  ) {}

  async createProduct(data: {
    title: string;
    description: string;
    subcategory: string;
    variants: Array<{ ram: string; price: number; quantity: number }>;
    images: string[];
  }): Promise<IProduct> {
    // Validation
    if (!data.title || typeof data.title !== "string") {
      throw new Error("Title is required");
    }
    if (!data.description || typeof data.description !== "string") {
      throw new Error("Description is required");
    }
    if (!data.subcategory || !mongoose.Types.ObjectId.isValid(data.subcategory)) {
      throw new Error("Invalid subcategory ID");
    }
    const subcategoryDoc = await this.categoryRepository.findCategoryById(data.subcategory);
    if (!subcategoryDoc || !subcategoryDoc.parentId) {
      throw new Error("Subcategory not found or is not a subcategory");
    }
    if (!data.variants || !Array.isArray(data.variants) || data.variants.length === 0) {
      throw new Error("At least one variant is required");
    }
    for (const variant of data.variants) {
      if (!variant.ram || variant.price == null || variant.quantity == null) {
        throw new Error("Each variant must have ram, price, and quantity");
      }
      if (typeof variant.price !== "number" || variant.price <= 0) {
        throw new Error("Price must be a positive number");
      }
      if (typeof variant.quantity !== "number" || variant.quantity < 0) {
        throw new Error("Quantity must be a non-negative number");
      }
    }
    if (!data.images || !Array.isArray(data.images) || data.images.length === 0 || data.images.length > 4) {
      throw new Error("Between 1 and 4 images are required");
    }

    // Construct product data
    const productData: ProductCreationData = {
      title: data.title,
      description: data.description,
      subcategory: new mongoose.Types.ObjectId(data.subcategory),
      variants: data.variants,
      images: data.images,
    };

    // Call the repository method
    return await this.productRepository.createProduct(productData);
  }

  async getProducts(page: number, perPage: number, subcategories: string[], search: string): Promise<{ products: IProduct[]; totalCount: number }> {
    return await this.productRepository.getProducts(page, perPage, subcategories, search);
  }

  async getProductById(id: string): Promise<IProduct | null> {
      try {
        const product = await this.productRepository.findProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : String(error));
      }
  }
}
