import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   async createUser(user: User): Promise<User> {
      return this.userModel.create(user);
   }

   async findUserById(userId: any): Promise<User> {
      return this.userModel.findById(userId);
   }
}
