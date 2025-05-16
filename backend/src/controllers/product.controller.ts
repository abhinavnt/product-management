import { inject, injectable } from "inversify";
import { IProductController } from "../core/interface/controller/IProductController";
import { TYPES } from "../di/types";
import { IProductService } from "../core/interface/service/IProductService";
import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { uploadToCloudinary } from "../config/cloudinary";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

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

  getProducts=asyncHandler(async(req:Request,res:Response):Promise<void>=>{
     const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const subcategories = req.query.subcategories ? (req.query.subcategories as string).split(',') : [];
    const search = req.query.search as string || '';
    const { products, totalCount } = await this.productService.getProducts(page, perPage, subcategories, search);
    res.json({ products, totalCount, page, perPage });
  })

  getProductById=asyncHandler(async(req:Request,res:Response):Promise<void>=>{
    const { id } = req.params;
      const product = await this.productService.getProductById(id);
      res.status(200).json(product);
  })
}