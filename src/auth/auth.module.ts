import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
   controllers: [AuthController],
   providers: [
      AuthService,
      JwtAuthGuard,
      JwtStrategy,
      GoogleStrategy,
      FacebookStrategy,
   ], // Add JwtAuthGuard to providers
   imports: [
      UserModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
         secret: 'SECRET',
         signOptions: { expiresIn: '20d' },
      }),
   ],
   exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}