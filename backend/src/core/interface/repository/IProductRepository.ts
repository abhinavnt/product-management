import { IProduct } from "../../../model/Product";
import { ProductCreationData } from "../../../services/product.service";

export interface IProductRepository{
    createProduct(productData: ProductCreationData): Promise<IProduct>
}