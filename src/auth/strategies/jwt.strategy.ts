import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces';
import { UserService } from 'src/modules/user/user.service';
import { log } from 'console';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(private userService: UserService) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: 'supa-secret-its-a-public-sec',
      });
   }

   async validate(payload: JWTPayload) {
      // i want it to return the user
      // so i can use the user in the controller

      const user = await this.userService.findUserById(payload.userId);

      if (!user) {
         return null;
      }

      log(user);

      return user;
   }
}
