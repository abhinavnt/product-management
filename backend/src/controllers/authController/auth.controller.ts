import { injectable } from "inversify";
import { IAuthController } from "../../core/interface/controller/IAuthController";
import { inject } from "inversify";
import { TYPES } from "../../di/types";
import { IAuthService } from "../../core/interface/service/IAuthService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

@injectable()
export class AuthController implements IAuthController{
constructor(@inject(TYPES.AuthService) private authService:IAuthService){}

  register=asyncHandler(async(req:Request,res:Response):Promise<void>=>{

     const { name, email, password } = req.body;

    const response= await this.authService.register(name,email,password)

    const { refreshToken, ...newUser } = response;

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    
      res.status(200).json(newUser);
    
  })
}