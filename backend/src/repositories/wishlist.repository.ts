import { BaseRepository } from "../core/abstracts/base.repository";
import { IWishlistRepository } from "../core/interface/repository/IWishlistReposiotry";
import { IWishlist, Wishlist } from "../model/Wishlist";

export class WishlistRepository extends BaseRepository<IWishlist> implements IWishlistRepository {
  constructor() {
    super(Wishlist);
  }

  async getWishlist(userId: string): Promise<string[]> {
    const wishlist = await this.findOne({ user: userId });
    return wishlist ? wishlist.products.map((p) => p.toString()) : [];
  }

  async addToWishlist(userId: string, productId: string): Promise<void> {
    await this.findOneAndUpdate({ user: userId }, { $addToSet: { products: productId } }, { upsert: true });
  }

  async removeFromWishlist(userId: string, productId: string): Promise<void> {
    await this.findOneAndUpdate({ user: userId }, { $pull: { products: productId } });
  }

    async findByUserId(userId: string): Promise<IWishlist | null> {
    return this.findOne({ user: userId }).exec();
  }

 
}
