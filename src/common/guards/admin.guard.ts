import {
   Injectable,
   CanActivate,
   ExecutionContext,
   UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums';

@Injectable()
export class AdminGuard implements CanActivate {
   constructor(private reflector: Reflector) {}

   canActivate(
      context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();

      if (request.user && request.user.role === Role.ADMIN) {
         return true;
      }

      throw new UnauthorizedException('Access Unauthorized');
   }
}
