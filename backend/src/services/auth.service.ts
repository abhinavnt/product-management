import { inject, injectable } from "inversify";
import { IAuthService } from "../core/interface/service/IAuthService";
import { TYPES } from "../di/types";
import { IUserRepository } from "../core/interface/repository/IUserRepository";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifiedUer } from "../core/types/user.types";

@injectable()
export class AuthService implements IAuthService {
  constructor(@inject(TYPES.UserRepository) private userRepository: IUserRepository) {}


  //register
  async register(name: string, email: string, password: string): Promise<verifiedUer> {
    try {
      const existingUser = await this.userRepository.findUserByEmail(email);

      if (existingUser) throw new Error("Email is alredy taken");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userRepository.createUser(name, email, hashedPassword);

      if (!user) throw new Error("Cannot create user please register again");

      const userId = user._id;

      const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "60m" });

      const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
