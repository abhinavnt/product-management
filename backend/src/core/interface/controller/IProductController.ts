import { RequestHandler } from "express";


export interface IProductController{
    addProduct:RequestHandler
    getProducts:RequestHandler
    getProductById:RequestHandler
}