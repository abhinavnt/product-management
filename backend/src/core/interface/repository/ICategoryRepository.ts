import { ICategory } from "../../../model/Category";
import { ICategoryWithSubcategories } from "../../../services/category.service";



export interface ICategoryRepository{
    createCategory(name: string): Promise<ICategory>
    createSubCategory(parentId: string, name: string): Promise<ICategory>
    getCategories(): Promise<ICategory[]>
    findCategoryById(id: string): Promise<ICategory | null>
     getCategoriesWithSubcategories(): Promise<ICategoryWithSubcategories[]>
}