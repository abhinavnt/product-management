import express from "express";

import { IAuthController } from "../core/interface/controller/IAuthController";
import container from "../di/container";
import { TYPES } from "../di/types";

const router = express.Router();

const authController = container.get<IAuthController>(TYPES.AuthController);

router.post("/register", authController.register);


export default router;