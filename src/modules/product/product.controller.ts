import {
   Controller,
   Get,
   Post,
   Put,
   Delete,
   Body,
   Param,
   UseGuards,
   Req,
} from '@nestjs/common';

import { ProductService } from '../product/product.service';
import { CreateProductDTO, UpdateProductDTO } from '../product/dto';
import { VendorGuard } from '../../common/guards';
import { log } from 'console';
import { JWTVendorAuthGuard } from 'src/auth/guards/jwtVendor.auth.guard';

@UseGuards(JWTVendorAuthGuard)
@Controller('product')
export class ProductController {
   constructor(private readonly productService: ProductService) {}

   @Get('vendor')
   async getProductsForVendor(@Req() req) {
      const vendorId = req.user._id;
      log('user: ' + req.user);
      console.log(vendorId);

      return await this.productService.getProductsForVendor(vendorId);
   }

   @Post('vendor')
   async createProduct(@Req() req, @Body() createProductDTO: CreateProductDTO) {
      const vendorId = req.user._id;
      return this.productService.createProductForVendor(
         vendorId,
         createProductDTO,
      );
   }

   @Put('vendor/:id')
   async updateProduct(
      @Req() req,
      @Param('id') productId: string,
      @Body() updateProductDTO: UpdateProductDTO,
   ) {
      const vendorId = req.user._id;
      return this.productService.updateProductForVendor(
         vendorId,
         productId,
         updateProductDTO,
      );
   }

   @Delete('vendor/:id')
   @UseGuards(VendorGuard)
   async deleteProduct(@Req() req, @Param('id') productId: string) {
      const vendorId = req.user._id;
      return this.productService.deleteProduct(vendorId, productId);
   }

   // FOR USERS -- I GUESS WE CAN LET THEM USE OUR APP ALSO (OPTIONAL) -- kidding 😂

   @Get(':id')
   async getProductById(@Param('id') productId: string) {
      return this.productService.getProductByIdForUsers(productId);
   }
}
