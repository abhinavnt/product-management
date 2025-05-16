import { IProduct } from "../../../model/Product";
import { ProductCreationData } from "../../../services/product.service";

export interface IProductRepository{
    createProduct(productData: ProductCreationData): Promise<IProduct>
    getProducts(page: number, perPage: number, subcategories: string[], search: string): Promise<{ products: IProduct[]; totalCount: number }>
    findProducts(query: any): Promise<IProduct[]>
    findProductById(id: string): Promise<IProduct | null>
    
}