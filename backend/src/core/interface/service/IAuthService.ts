import { refreshedUser, verifiedUer } from "../../types/user.types";


export interface IAuthService{
    register(name: string, email: string, password: string): Promise<verifiedUer>
    login(email: string, password: string, role: string): Promise<verifiedUer>
    refreshAccessToken(refreshToken: string): Promise<refreshedUser>
}