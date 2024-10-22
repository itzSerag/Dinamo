import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import { Cart, CartSchema } from './schemas/cart.schema';

@Module({
   controllers: [CartController],
   providers: [CartService],
   imports: [
      MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
      MongooseModule.forFeature([
         { name: Product.name, schema: ProductSchema },
      ]),
   ],
})
export class CartModule {}
