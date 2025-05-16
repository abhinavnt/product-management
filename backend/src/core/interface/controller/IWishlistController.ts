import { RequestHandler } from "express";

export interface IWishlistController {
  getWishlistHandler: RequestHandler;
  addToWishlistHandler: RequestHandler;
  removeFromWishlistHandler: RequestHandler;
  getWishlistProducts: RequestHandler;
}
