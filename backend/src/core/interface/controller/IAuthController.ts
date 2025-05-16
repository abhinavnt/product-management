import { RequestHandler } from "express"


export interface IAuthController{
    register:RequestHandler
    login:RequestHandler
    refreshToken:RequestHandler
    logout:RequestHandler
}