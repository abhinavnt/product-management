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
import { IProductRepository } from "../core/interface/repository/IProductRepository";
import { ProductRepository } from "../repositories/product.repository";
import { IProductService } from "../core/interface/service/IProductService";
import { ProductService } from "../services/product.service";
import { IProductController } from "../core/interface/controller/IProductController";
import { ProductController } from "../controllers/product.controller";
import { IWishlistRepository } from "../core/interface/repository/IWishlistReposiotry";
import { WishlistRepository } from "../repositories/wishlist.repository";
import { IWishlistService } from "../core/interface/service/IWishlistService";
import { WishlistService } from "../services/wishlist.service";
import { IWishlistController } from "../core/interface/controller/IWishlistController";
import { WishlistController } from "../controllers/wishlist.controller";



const container=new Container()



container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthController>(TYPES.AuthController).to(AuthController)

container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)

container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository)
container.bind<IProductService>(TYPES.ProductService).to(ProductService)
container.bind<IProductController>(TYPES.ProductController).to(ProductController)

container.bind<IWishlistRepository>(TYPES.WishlistRepository).to(WishlistRepository)
container.bind<IWishlistService>(TYPES.WishlistService).to(WishlistService)
container.bind<IWishlistController>(TYPES.WishlistController).to(WishlistController)


export default container