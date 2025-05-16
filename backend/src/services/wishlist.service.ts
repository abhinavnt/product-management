import { inject, injectable } from "inversify";
import { IWishlistService } from "../core/interface/service/IWishlistService";
import { TYPES } from "../di/types";
import { IWishlistRepository } from "../core/interface/repository/IWishlistReposiotry";
import { IProduct } from "../model/Product";
import { IProductRepository } from "../core/interface/repository/IProductRepository";


@injectable()
export class WishlistService implements IWishlistService{
    constructor(@inject(TYPES.WishlistRepository) private wishlistRepository:IWishlistRepository,
                @inject(TYPES.ProductRepository) private productRepository:IProductRepository
){}

    async getWishlist(userId: string): Promise<string[]> {
    return this.wishlistRepository.getWishlist(userId);
  }

  async addToWishlist(userId: string, productId: string): Promise<void> {
    await this.wishlistRepository.addToWishlist(userId, productId);
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    await this.wishlistRepository.removeFromWishlist(userId, productId);
  }

  async getWishlistProducts(userId: string): Promise<IProduct[]> {
    
  const wishlist = await this.wishlistRepository.findByUserId(userId);
  if (!wishlist) return [];

  const productIds = wishlist.products.map(String);
  const products = await Promise.all(
    productIds.map((id) => this.productRepository.findProductById(id))
  );

  return products.filter((product): product is IProduct => product !== null);
}
}