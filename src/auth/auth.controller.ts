import {
   Body,
   Controller,
   Get,
   Post,
   Req,
   Res,
   UnauthorizedException,
   UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { JWTPayload } from './interfaces';
import { LoginDto } from './dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
   constructor(
      private jwtService: JwtService,
      private authService: AuthService,
   ) {}

   @Post('signup')
   async signup(@Body() user: SignupDto) {
      const jwt = await this.authService.signup(
         user.firstName,
         user.lastName,
         user.phoneNumber,
         user.password,
      );
      return { access_token: jwt };
   }

   @Post('login')
   async login(@Body() user: LoginDto) {
      return this.authService.login(user.phoneNumber, user.password);
   }

   @Get('google')
   @UseGuards(AuthGuard('google'))
   async googleAuth() {
      // redirect to home page with access token
   }

   @Get('google/callback')
   @UseGuards(AuthGuard('google'))
   async googleAuthRedirect(@Req() req, @Res() res: Response) {
      const user = await this.authService.__findOrCreateAuthUser(req.user);
      if (!user) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JWTPayload = {
         userId: user._id,
         username: user.firstName,
      };

      const jwt = await this.authService.__generateToken(payload);
      // redirect to home page with access token then frontend must redirect to home page
      res.redirect(`${process.env.WEBSITE_URL}/callback?token=${jwt}`);
   }

   @Get('facebook')
   @UseGuards(AuthGuard('facebook'))
   async facebookAuth() {
      // redirect to home page with access token
   }

   @Get('facebook/callback')
   @UseGuards(AuthGuard('facebook'))
   async facebookAuthRedirect(@Req() req, @Res() res: Response) {
      const user = await this.authService.__findOrCreateAuthUser(req.user);
      if (!user) {
         throw new UnauthorizedException('Invalid credentials');
      }

      const payload: JWTPayload = {
         userId: user._id,
         username: user.firstName,
      };

      const jwt = await this.authService.__generateToken(payload);
      res.redirect(`${process.env.WEBSITE_URL}/callback?token=${jwt}`);
   }
}
