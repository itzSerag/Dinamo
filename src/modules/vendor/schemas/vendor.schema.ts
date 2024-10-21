import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Vendor extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Address' })
  address: Types.ObjectId;

  @Prop({ default: false })
  isVerified: boolean;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
