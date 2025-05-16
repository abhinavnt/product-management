import { ICategory } from "../../../model/Category";



export interface ICategoryRepository{
    createCategory(name: string): Promise<ICategory>
    createSubCategory(parentId: string, name: string): Promise<ICategory>
    getCategories(): Promise<ICategory[]>

}