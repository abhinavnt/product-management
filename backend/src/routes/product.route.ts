import express from "express";
import container from "../di/container";
import { TYPES } from "../di/types";
import { authMiddleware } from "../middlewares/authMiddleware";
import { IProductController } from "../core/interface/controller/IProductController";
import upload from "../config/multer";

const router = express.Router();
const productController = container.get<IProductController>(TYPES.ProductController);

// router.use(authMiddleware());

router.post("/addProduct",upload.array("images", 4), productController.addProduct);

router.get('/products',productController.getProducts)

router.get("/:id", productController.getProductById);

router.put("/:id", upload.array("newImages", 4), productController.updateProduct);

export default router;
