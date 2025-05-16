import { IUser } from "../../../model/User";


export interface IUserRepository{
    createUser(name: string, email: string, hashedPassword: string): Promise<IUser | null>
    findUserByEmail(email: string): Promise<IUser | null>
    findUserById(id:string):Promise<IUser|null>
}