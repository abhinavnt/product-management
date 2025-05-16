import { injectable } from "inversify";
import { IAuthController } from "../../core/interface/controller/IAuthController";
import { inject } from "inversify";
import { TYPES } from "../../di/types";
import { IAuthService } from "../../core/interface/service/IAuthService";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService) {}

  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    const response = await this.authService.register(name, email, password);

    const { refreshToken, ...newUser } = response;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json(newUser);
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;

    const { refreshToken, ...user } = await this.authService.login(email, password, role);

    console.log(refreshToken,"refreshtoken");
    

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    const refreshToken2 = req.cookies.refreshToken

    console.log(refreshToken2,"token2");

    res.status(200).json(user);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log("reached refreshToken");
    
    const refreshToken = req.cookies.refreshToken

    console.log(refreshToken,"token");
    
    if (!refreshToken) res.status(403).json({ error: "Refresh tokekn required" });
    const { accessToken, user } = await this.authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken, user });
  });

  logout=asyncHandler(async(req:Request,res:Response):Promise<void>=>{

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(200).json({ message: "Logged out successfully" });
  })
}
