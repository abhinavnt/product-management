import { Container } from "inversify";
import {TYPES} from './types'
import { IUserRepository } from "../core/interface/repository/IUserRepository";
import { UserRepository } from "../repositories/user.repository";
import { IAuthService } from "../core/interface/service/IAuthService";
import { AuthService } from "../services/auth.service";
import { IAuthController } from "../core/interface/controller/IAuthController";
import { AuthController } from "../controllers/authController/auth.controller";
import { ICategoryRepository } from "../core/interface/repository/ICategoryRepository";
import { CategoryRepository } from "../repositories/category.repository";
import { ICategoryService } from "../core/interface/service/ICategoryService";
import { CategoryService } from "../services/category.service";
import { ICategoryController } from "../core/interface/controller/ICategoryController";
import { CategoryController } from "../controllers/category.controller";



const container=new Container()



container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)

container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)


export default container