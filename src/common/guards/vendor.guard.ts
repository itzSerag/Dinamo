import {
   Injectable,
   CanActivate,
   ExecutionContext,
   UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums';
import { log } from 'console';

@Injectable()
export class VendorGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

   canActivate(
      context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();

      log('user: ' + request.user);
      if (request.user && request.user.role === Role.ADMIN) {
         
      }

      throw new UnauthorizedException('Access Unauthorized');
   }
}
