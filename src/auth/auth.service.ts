import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { JWTPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './dto';
import { UserService } from 'src/modules/user/user.service';
import { log } from 'console';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService,
      private userService: UserService,
   ) {}

   async signup(user: CreateUserDTO) {
      const existingUser = await this.userModel.findOne({
         phoneNumber: user.phoneNumber,
      });
      if (existingUser) {
         throw new UnauthorizedException('User already registered');
      }

      const newUser = await this.userService.createUser(user);
      newUser.save();
      
      const payload: JWTPayload = {
         userId: newUser._id,
         username: newUser.firstName,
         role: newUser.role,
      };

      const jwt = await this.__generateToken(payload);
      return {
         access_token: jwt,
      };
   }

   async login(
      phoneNumber: string,
      password: string,
   ): Promise<{ access_token: string }> {
      const user = await this.userModel.findOne({
         phoneNumber,
      });
      if (!user || !(await user.validatePassword(password))) {
         throw new UnauthorizedException('Invalid credentials');
      }

      // yeah it repetitive but we need to make sure that the user is verified fastest possible for now
      const payload: JWTPayload = {
         userId: user._id,
         username: user.firstName,
         role: user.role,
      };

      const jwt = await this.__generateToken(payload);
      return { access_token: jwt };
   }

   async __findOrCreateAuthUser(profile: any): Promise<User> {
      const { id } = profile;
      let user = await this.userModel.findOne({ socialId: id });
      if (!user) {
         user = await this.userModel.create({
            isVerified: true,
            socialId: id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            provider: profile.provider,
         });
      }
      return user;
   }

   async __generateToken(payload: JWTPayload): Promise<string> {
      return this.jwtService.sign(payload);
   }
}
