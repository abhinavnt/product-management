import { ICategory } from "../../../model/Category";



export interface ICategoryService{
    createCategory(name: string): Promise<ICategory>
    createSubCategory(parentId: string, name: string): Promise<ICategory>
    getCategories(): Promise<ICategory[]>
}