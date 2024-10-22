import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schemas/product.schema';
import { VendorModule } from '../vendor/vendor.module';

@Module({
   controllers: [ProductController],
   providers: [ProductService],
   imports: [
      MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
      VendorModule,
   ],
})
export class ProductModule {}
