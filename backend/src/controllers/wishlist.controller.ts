import { inject, injectable } from "inversify";
import { IWishlistController } from "../core/interface/controller/IWishlistController";
import { TYPES } from "../di/types";
import { IWishlistService } from "../core/interface/service/IWishlistService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

@injectable()
export class WishlistController implements IWishlistController {
  constructor(@inject(TYPES.WishlistService) private wishlistService: IWishlistService) {}

  getWishlistHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const products = await this.wishlistService.getWishlist(userId);
    res.json({ products });
  });

  addToWishlistHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const productId = req.params.productId;
    await this.wishlistService.addToWishlist(userId, productId);
    res.status(200).send();
  });

  removeFromWishlistHandler = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const productId = req.params.productId;
    await this.wishlistService.removeFromWishlist(userId, productId);
    res.status(200).send();
  });

  getWishlistProducts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    console.log(userId,"userID");
    
    const products = await this.wishlistService.getWishlistProducts(userId);
    res.json({ products });
  });
}
