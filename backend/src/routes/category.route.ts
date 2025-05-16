import express from "express";
import container from "../di/container";
import { TYPES } from "../di/types";
import { ICategoryController } from "../core/interface/controller/ICategoryController";
import { authMiddleware } from "../middlewares/authMiddleware";


const router = express.Router();
const categoryController = container.get<ICategoryController>(TYPES.CategoryController);

// router.use(authMiddleware())

router.post('/categories',categoryController.createCategory)

router.post('/categories/:categoryId/subcategories',categoryController.createSubCategory)

router.get('/categories',categoryController.getCategories)

router.get("/categories-with-subcategories", categoryController.getCategoriesWithSubcategories);

export default router;