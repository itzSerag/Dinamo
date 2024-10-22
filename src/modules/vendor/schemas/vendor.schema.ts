import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class Vendor extends Document {
   // must be unique for each vendor
   @Prop({ required: true, unique: true })
   name: string;

   @Prop({ required: true, unique: true })
   email: string;

   @Prop({ required: true })
   password: string;

   @Prop({ type: Types.ObjectId, ref: 'Address' })
   address: Types.ObjectId;

   @Prop({ default: false })
   isVerified: boolean;

   // Instance method for password validation
   async validatePassword(password: string): Promise<boolean> {
      if (!this.password) return false;
      return await bcrypt.compare(password, this.password);
   }
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);

VendorSchema.methods.validatePassword = async function (
   password: string,
): Promise<boolean> {
   if (!this.password) return false;
   return await bcrypt.compare(password, this.password);
};

export type VendorDocument = Vendor & Document;
