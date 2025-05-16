import { IWishlist } from "../../../model/Wishlist"



export interface IWishlistRepository{
    getWishlist(userId: string): Promise<string[]>
    removeFromWishlist(userId: string, productId: string): Promise<void>
    addToWishlist(userId: string, productId: string): Promise<void>
    findByUserId(userId: string): Promise<IWishlist | null>
}