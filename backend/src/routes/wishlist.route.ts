import express from "express";
import container from "../di/container";
import { TYPES } from "../di/types";
import { authMiddleware } from "../middlewares/authMiddleware";
import { IWishlistController } from "../core/interface/controller/IWishlistController";

const router = express.Router();
const wishlistController = container.get<IWishlistController>(TYPES.WishlistController);


router.get("/:id",  wishlistController.getWishlistHandler);
router.post("/:productId/:id",  wishlistController.addToWishlistHandler);
router.delete("/:productId/:id", wishlistController.removeFromWishlistHandler);
router.get('/products/:userId', wishlistController.getWishlistProducts);





export default router;