import { IProduct } from "../../../model/Product";

export interface IProductService {
  createProduct(data: {
    title: string;
    description: string;
    subcategory: string;
    variants: Array<{ ram: string; price: number; quantity: number }>;
    images: string[];
  }): Promise<Partial<IProduct>>;
   getProducts(page: number, perPage: number, subcategories: string[], search: string): Promise<{ products: IProduct[]; totalCount: number }>
   getProductById(id: string): Promise<IProduct | null>
}
