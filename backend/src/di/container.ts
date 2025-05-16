import { Container } from "inversify";
import {TYPES} from './types'
import { IUserRepository } from "../core/interface/repository/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IAuthService } from "../core/interface/service/IAuthService";
import { AuthService } from "../services/auth.service";
import { IAuthController } from "../core/interface/controller/IAuthController";
import { AuthController } from "../controllers/authController/auth.controller";



const container=new Container()



container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)



export default container