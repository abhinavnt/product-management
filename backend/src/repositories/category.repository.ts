import mongoose, { Mongoose } from "mongoose";
import { BaseRepository } from "../core/abstracts/base.repository";
import { ICategoryRepository } from "../core/interface/repository/ICategoryRepository";
import { Category, ICategory } from "../model/Category";
import { ICategoryWithSubcategories } from "../services/category.service";

export class CategoryRepository extends BaseRepository<ICategory> implements ICategoryRepository {
  constructor() {
    super(Category);
  }

  //create category
  async createCategory(name: string): Promise<ICategory> {
    //to add category
    const category = new this.model({ name, parentId: null });
    return category.save();
  }

  //create sub category
  async createSubCategory(parentId: string, name: string): Promise<ICategory> {
    //to find the parrent category
    const parent = await this.findById(new mongoose.Types.ObjectId(parentId));

    if (!parent) {
      throw new Error("Parent category not found");
    }

    if (parent.parentId !== null) {
      throw new Error("Cannot create subcategory under another subcategory");
    }

    //to add the sub category
    const subCategory = new this.model({ name, parentId });

    return subCategory.save();
  }

  //get all parent category
  async getCategories(): Promise<ICategory[]> {
    return this.find({ parentId: null }).exec();
  }

  //find category byid
  async findCategoryById(id: string): Promise<ICategory | null> {
    return await this.findById(new mongoose.Types.ObjectId(id));
  }

  //get category with subcategory
  async getCategoriesWithSubcategories(): Promise<ICategoryWithSubcategories[]> {
  const categories = await this.aggregate([
    {
      $match: { parentId: null }, 
    },
    {
      $lookup: {
        from: "categories", 
        localField: "_id",
        foreignField: "parentId",
        as: "subcategories",
      },
    },
  ])

  return categories as ICategoryWithSubcategories[];
  }
}
