import { RequestHandler } from "express";


export interface ICategoryController{
    createCategory:RequestHandler
    createSubCategory:RequestHandler
     getCategories:RequestHandler
}