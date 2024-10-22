import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { AuthProviders } from '../../common/enums';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
   constructor() {
      super({
         clientID: process.env.FACEBOOK_APP_ID,
         clientSecret: process.env.FACEBOOK_APP_SECRET,
         callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
         scope: ['email'], // Ensure 'email' is a valid scope
         profileFields: ['id', 'emails', 'name'], // Ensure these fields are correct
      });
   }

   async validate(
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (err: any, user: any, info?: any) => void,
   ): Promise<any> {
      const { id, name } = profile;
      const user = {
         socialId: id,
         firstName: name.givenName,
         lastName: name.familyName,
         provider: AuthProviders.FACEBOOK,
      };

      done(null, user);
   }
}
