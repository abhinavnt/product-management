import { inject, injectable } from "inversify";
import { ICategoryService } from "../core/interface/service/ICategoryService";
import { TYPES } from "../di/types";
import { ICategoryRepository } from "../core/interface/repository/ICategoryRepository";
import { ICategory } from "../model/Category";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(@inject(TYPES.CategoryRepository) private categoryReposiory: ICategoryRepository) {}

  //create category
  async createCategory(name: string): Promise<ICategory> {
    try {
      if (!name) {
        throw new Error("category name need");
      }

      return await this.categoryReposiory.createCategory(name);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  //create subcategory
  async createSubCategory(parentId: string, name: string): Promise<ICategory> {
    try {
      if (!parentId || !name) {
        throw new Error("Subcategory name and parrent ID need");
      }

      return await this.categoryReposiory.createSubCategory(parentId, name);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async getCategories(): Promise<ICategory[]> {
    try {
      return await this.categoryReposiory.getCategories();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
