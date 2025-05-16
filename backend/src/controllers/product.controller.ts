import { inject, injectable } from "inversify";
import { IProductController } from "../core/interface/controller/IProductController";
import { TYPES } from "../di/types";
import { IProductService } from "../core/interface/service/IProductService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinary";

@injectable()
export class ProductController implements IProductController{
  constructor(@inject(TYPES.ProductService) private productService: IProductService){}


  addProduct=asyncHandler(async(req:Request,res:Response):Promise<void>=>{
   const { title, description, subcategory, variants } = req.body;
    const imageFiles = req.files as Express.Multer.File[];

    if (!imageFiles || imageFiles.length === 0) {
      res.status(400).json({ message: "At least one image is required" });
      return;
    }

    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        return await uploadToCloudinary(file.buffer, file.mimetype, "product_images");
      })
    );

    const parsedVariants = typeof variants === "string" ? JSON.parse(variants) : variants;

    const product = await this.productService.createProduct({
      title,
      description,
      subcategory,
      variants: parsedVariants,
      images: imageUrls,
    });

    res.status(201).json(product);
  })

}