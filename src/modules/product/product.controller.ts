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
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { VendorGuard } from 'src/common/guards/vendor.guard';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
   constructor(private readonly productService: ProductService) {}

   @Post('vendor')
   @UseGuards(VendorGuard)
   async createProduct(@Req() req, @Body() createProductDTO: CreateProductDTO) {
      const vendorId = req.user._id;
      return this.productService.createProductForVendor(
         vendorId,
         createProductDTO,
      );
   }

   @Get('vendor')
   @UseGuards(VendorGuard)
   async getProductsForVendor(@Req() req) {
      const vendorId = req.user._id;
      return this.productService.getProductsForVendor(vendorId);
   }

   @Put('vendor/:id')
   @UseGuards(VendorGuard)
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
