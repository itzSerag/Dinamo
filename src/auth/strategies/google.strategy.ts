import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { log } from 'node:console';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
   constructor() {
      super({
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
         scope: ['email', 'profile'],
      });
   }

   async validate(
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback,
   ): Promise<any> {
      const { id, name } = profile;

      log('profile', profile);

      // we could make this user type User form the schema
      // BUT -- > for two days only its overhead
      const user = {
         socialId: id,
         firstName: name.givenName,
         lastName: name.familyName,
         provider: 'google',
      };

      done(null, user);
   }
}
