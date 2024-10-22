import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO } from 'src/auth/dto/createUser.dto';

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   async createUser(user: CreateUserDTO): Promise<User> {
      return this.userModel.create(user);
   }

   async findUserById(userId: any): Promise<User> {
      return await this.userModel.findById(userId);
   }

   async getAllUsers(): Promise<User[]> {
      return this.userModel.find();
   }

   async me(userId: any) {
      // return user
      return this.userModel.find(userId);
   }
}
