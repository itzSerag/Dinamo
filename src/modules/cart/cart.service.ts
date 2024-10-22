import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Product, ProductDocument } from '../product/schemas/product.schema';
import { AddToCartDTO } from './dto';

@Injectable()
export class CartService {
   constructor(
      @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
      @InjectModel(Product.name) private productModel: Model<ProductDocument>,
   ) {}

   async addToCart(userId: string, addToCartDTO: AddToCartDTO): Promise<Cart> {
      const { productId, quantity } = addToCartDTO;

      const product = await this.productModel.findById(productId).exec();
      if (!product) {
         throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      let cart = await this.cartModel
         .findOne({ user: userId, status: 'active' })
         .exec();
      if (!cart) {
         cart = new this.cartModel({
            user: userId,
            items: [],
            status: 'active',
         });
      }

      const productObjectId = new Types.ObjectId(productId);
      const existingItemIndex = cart.items.findIndex((item) =>
         item.product.equals(productObjectId),
      );
      if (existingItemIndex > -1) {
         cart.items[existingItemIndex].quantity += quantity;
         cart.items[existingItemIndex].price =
            product.price * cart.items[existingItemIndex].quantity;
      } else {
         cart.items.push({
            product: productObjectId,
            quantity,
            price: product.price * quantity,
         });
      }

      return cart.save();
   }

   async getCart(userId: string): Promise<Cart> {
      const cart = await this.cartModel
         .findOne({ user: userId, status: 'active' })
         .populate('items.product');

      if (!cart) {
         throw new NotFoundException(
            `Active cart for user with ID ${userId} not found`,
         );
      }
      return cart;
   }

   async removeItem(userId: string, productId: string): Promise<Cart> {
      const cart = await this.cartModel.findOne({
         user: userId,
         status: 'active',
      });

      if (!cart) {
         throw new NotFoundException(
            `Active cart for user with ID ${userId} not found`,
         );
      }

      const productObjectId = new Types.ObjectId(productId);
      cart.items = cart.items.filter(
         (item) => !item.product.equals(productObjectId),
      );
      return cart.save();
   }

   async clearCart(userId: string): Promise<Cart> {
      const cart = await this.cartModel.findOne({
         user: userId,
         status: 'active',
      });

      if (!cart) {
         throw new NotFoundException(
            `Active cart for user with ID ${userId} not found`,
         );
      }

      cart.items = [];
      return cart.save();
   }
}
