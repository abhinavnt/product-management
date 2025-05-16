import { IProduct } from "../../../model/Product";

export interface IWishlistService {
  getWishlist(userId: string): Promise<string[]>;
  addToWishlist(userId: string, productId: string): Promise<void>;
  removeFromWishlist(userId: string, productId: string): Promise<void>;
  getWishlistProducts(userId: string): Promise<IProduct[]>
}
