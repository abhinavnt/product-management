import { ICategory } from "../../../model/Category";
import { ICategoryWithSubcategories } from "../../../services/category.service";



export interface ICategoryService{
    createCategory(name: string): Promise<ICategory>
    createSubCategory(parentId: string, name: string): Promise<ICategory>
    getCategories(): Promise<ICategory[]>
    getCategoriesWithSubcategories(): Promise<ICategoryWithSubcategories[]>
}