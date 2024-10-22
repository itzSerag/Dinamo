import {
   Controller,
   Get,
   Post,
   Delete,
   Body,
   Param,
   UseGuards,
   Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDTO } from './dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
   constructor(private readonly cartService: CartService) {}

   @Post('add')
   async addToCart(@Req() req, @Body() addToCartDTO: AddToCartDTO) {
      const userId = req.user._id;
      return this.cartService.addToCart(userId, addToCartDTO);
   }

   @Get()
   async getCart(@Req() req) {
      const userId = req.user._id;
      return this.cartService.getCart(userId);
   }

   @Delete('remove/:productId')
   async removeItem(@Req() req, @Param('productId') productId: string) {
      const userId = req.user.userId;
      return this.cartService.removeItem(userId, productId);
   }

   @Delete('clear')
   async clearCart(@Req() req) {
      const userId = req.user._id;
      return this.cartService.clearCart(userId);
   }
}
