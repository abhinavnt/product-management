import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";
import { IUser } from "../model/User";

declare module "express-serve-static-core" {
  interface Request {
    user?: Partial<IUser>;
    // file?: Express.Multer.File;
  }
}

export const authMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.cookies.accessToken || req.header("Authorization")?.split(" ")[1];

      if (!accessToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized: No token provided" });
        return;
      }

      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as { userId: string };

      req.user = { _id: decoded.userId };
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Token has expired" });
        return;
      }
      res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid token" });
    }
  };
};
