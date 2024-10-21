import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/modules/user/schemas/user.schema';
import { JWTPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      private jwtService: JwtService,
   ) {}

   async signup(
      firstName: string,
      lastName: string,
      phoneNumber: string,
      password: string,
   ): Promise<string> {
      const existingUser = await this.userModel.findOne({ phoneNumber });
      if (existingUser) {
         throw new UnauthorizedException('User already registered');
      }

      const user = await this.userModel.create({
         firstName,
         lastName,
         phoneNumber,
         password,
         provider: 'local',
      });

      // we gotta throw it somewhere AAAH
      const payload: JWTPayload = {
         userId: user._id,
         username: user.firstName,
      };

      return await this.__generateToken(payload);
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
