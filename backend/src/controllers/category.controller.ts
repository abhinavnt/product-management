import { ICategoryController } from "../core/interface/controller/ICategoryController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { ICategoryService } from "../core/interface/service/ICategoryService";

@injectable()
export class CategoryController implements ICategoryController {
  constructor(@inject(TYPES.CategoryService) private categoryService: ICategoryService) {}

  createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;
    const category = await this.categoryService.createCategory(name);
    res.status(201).json(category);
  });

  createSubCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params;
    const { name } = req.body;
    const subCategory = await this.categoryService.createSubCategory(categoryId, name);
    res.status(201).json(subCategory);
  });

  getCategories = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const categories = await this.categoryService.getCategories();
    res.json(categories);
  });
}
