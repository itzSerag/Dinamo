import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      private userService: UserService,
      configService: ConfigService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
      });
   }

   async validate(payload: JWTPayload) {
      // i want it to return the user
      // so i can use the user in the controller

      const user = await this.userService.findUserById(payload.userId);
      if (!user) {
         return null;
      }

      // not the best solution i know but 2 days u know
      user.password = undefined;
      return user;
   }
}
