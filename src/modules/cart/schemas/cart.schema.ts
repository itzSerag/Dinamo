import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Cart extends Document {
   @Prop({ type: Types.ObjectId, ref: 'User', required: true })
   user: Types.ObjectId;

   @Prop([
      {
         product: { type: Types.ObjectId, ref: 'Product', required: true },
         quantity: { type: Number, required: true, min: 1 },
         price: { type: Number, required: true, min: 0 },
      },
   ])
   items: Array<{
      product: Types.ObjectId;
      quantity: number;
      price: number;
   }>;

   @Prop({ default: 'active', enum: ['active', 'completed', 'abandoned'] })
   status: string;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

export type CartDocument = Cart & Document;
