import { BaseRepository } from "../core/abstracts/base.repository";
import { IProductRepository } from "../core/interface/repository/IProductRepository";
import { IProduct, Product } from "../model/Product";
import { ProductCreationData } from "../services/product.service";


export class ProductRepository extends BaseRepository<IProduct> implements IProductRepository{
 constructor(){
    super(Product)
 }

 async createProduct(productData: ProductCreationData): Promise<IProduct> {
     const product = new this.model(productData);
    return await product.save();
 }


}