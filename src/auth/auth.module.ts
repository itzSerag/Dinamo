import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { JWTVendorStrategy } from './strategies/jwtVendor.strategy';
import { JWTVendorAuthGuard } from './guards/jwtVendor.auth.guard';
import { VendorModule } from 'src/modules/vendor/vendor.module';

@Module({
   controllers: [AuthController],
   providers: [
      AuthService,
      JwtAuthGuard,
      JwtStrategy,
      GoogleStrategy,
      FacebookStrategy,
      JWTVendorStrategy,
      JWTVendorAuthGuard,
   ], // Add JwtAuthGuard to providers
   imports: [
      UserModule,
      // Forrrr circular dependency
      forwardRef(() => VendorModule),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
         secret: 'supa-secret-its-a-public-sec',
         signOptions: { expiresIn: '20d' },
      }),
   ],
   exports: [AuthService, JwtAuthGuard, JWTVendorAuthGuard],
})
export class AuthModule {}
