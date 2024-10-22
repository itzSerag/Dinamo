import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
   @Prop({ required: true })
   name: string;

   @Prop({ required: true })
   description: string;

   // consistency IS important
   @Prop({ required: true, min: 0 })
   price: number;

   @Prop({ required: true, min: 0 })
   stock: number;

   @Prop({ type: Types.ObjectId, ref: 'Vendor', required: true })
   vendor: Types.ObjectId;

   @Prop({ type: [String], index: true })
   categories: string[];

   @Prop({ type: [String] })
   // may have default URL
   images_url: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductDocument = Product & Document;
