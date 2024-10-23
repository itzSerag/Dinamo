import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../interfaces';
import { log } from 'console';
import { VendorService } from 'src/modules/vendor/vendor.service';

@Injectable()
export class JWTVendorStrategy extends PassportStrategy(
   Strategy,
   'jwt-vendor',
) {
   constructor(
      // making a circular dependency u see
      private vendorService: VendorService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: 'supa-secret-its-a-public-sec',
      });
   }

   async validate(payload: JWTPayload) {
      // i want it to return the user
      // so i can use the user in the controller

      const vendor = await this.vendorService.getVendorById(payload.userId);

      if (!vendor) {
         return null;
      }

      log(vendor);

      return vendor;
   }
}
