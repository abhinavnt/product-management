import { inject, injectable } from "inversify";
import { IAuthService } from "../core/interface/service/IAuthService";
import { TYPES } from "../di/types";
import { IUserRepository } from "../core/interface/repository/IUserRepository";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { refreshedUser, verifiedUer } from "../core/types/user.types";
import { IUser } from "../model/User";

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

  async login(email: string, password: string, role: string): Promise<verifiedUer> {
    try {
      let user: IUser | null = await this.userRepository.findUserByEmail(email);

      if (!user) throw new Error("Invalid email address");

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw new Error("Incorrect password");

      const userId = user._id;

      const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "60m" });

      const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" });

      return { accessToken, refreshToken, user: user as IUser };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<refreshedUser> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as {
        userId: string;
      };

      const userId = decoded.userId;

      const newAccessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "60m" });

      const user = await this.userRepository.findUserById(decoded.userId);

      if (!user) {
        throw new Error("cannot find user please try again");
      }

      return { accessToken: newAccessToken, user };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
