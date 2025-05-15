import { verifiedUer } from "../../types/user.types";


export interface IAuthService{
    register(name: string, email: string, password: string): Promise<verifiedUer>
}