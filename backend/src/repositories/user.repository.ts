import { BaseRepository } from "../core/abstracts/base.repository";
import { IUserRepository } from "../core/interface/repository/IUserRepository";
import { IUser, User } from "../model/User";




export class UserRepository extends BaseRepository<IUser> implements IUserRepository{
  constructor(){
    super(User)
  }

  async createUser(name: string, email: string, hashedPassword: string): Promise<IUser | null> {
      const user=new this.model({name,email,password:hashedPassword})
      return user.save()
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
      return this.findOne({email})
  }

  

}