import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { UserService } from './user.service';
import { log } from 'console';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
   constructor(private userService: UserService) {}

   @Get('all')
   @UseGuards(AdminGuard)
   async getAllUsers() {
      return this.userService.getAllUsers();
   }

   @Get('me')
   async getMe(@Req() req) {
      log(req.user);
      return await this.userService.findUserById(req.user._id);
   }
}
