import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTVendorAuthGuard extends AuthGuard('jwt-vendor') {}
