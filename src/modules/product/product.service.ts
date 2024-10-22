import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO, UpdateProductDTO } from './dto';
import { Vendor } from '../vendor/schemas/vendor.schema';

@Injectable()
export class ProductService {
   constructor(
      @InjectModel(Product.name) private productModel: Model<ProductDocument>,
      @InjectModel(Vendor.name) private vendorModel: Model<Vendor>,
   ) {}

   async createProductForVendor(
      vendorId: Types.ObjectId,
      createProductDTO: CreateProductDTO,
   ): Promise<Product> {
      // find the vendor of this product
      // check if the vendor exists

      const theVendor = await this.vendorModel.findById(vendorId);

      if (!theVendor) {
         throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
      }

      const newProduct = new this.productModel({
         ...createProductDTO,
         vendor: theVendor._id,
      });
      return newProduct.save();
   }

   async getProductsForVendor(vendorId: Types.ObjectId): Promise<Product[]> {
      return await this.productModel.find({ vendor: vendorId });
   }

   // async getProductById(productId: string): Promise<Product> {
   //    const product = await this.productModel.findById(productId);
   //    if (!product) {
   //       throw new NotFoundException(`Product with ID ${productId} not found`);
   //    }
   //    return product;
   // }

   async updateProductForVendor(
      vendorId: Types.ObjectId,
      productId: string,
      updateProductDTO: UpdateProductDTO,
   ): Promise<Product> {
      const product = await this.productModel.findOne({
         _id: productId,
         vendor: vendorId,
      });

      if (!product) {
         throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      // its jsut for safety u know
      Object.assign(product, updateProductDTO);
      return await product.save();
   }

   async deleteProduct(
      vendorId: Types.ObjectId,
      productId: string,
   ): Promise<Product> {
      const product = await this.productModel.findOneAndDelete({
         _id: productId,
         vendor: vendorId,
      });

      if (!product) {
         throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      return product;
   }

   //////////

   async getProductByIdForUsers(productId: string): Promise<Product> {
      const product = await this.productModel
         .findById(productId)
         .populate('vendor');

      return product;
   }
}
