import { IProduct } from "../../../model/Product";

export interface IProductService {
  createProduct(data: {
    title: string;
    description: string;
    subcategory: string;
    variants: Array<{ ram: string; price: number; quantity: number }>;
    images: string[];
  }): Promise<Partial<IProduct>>;
}
