import { IUser } from "../../model/User";


export interface verifiedUer {
   accessToken:string,
   refreshToken:string,
   user:IUser 
}

export interface refreshedUser {
    accessToken:string,
    user: IUser 
}
