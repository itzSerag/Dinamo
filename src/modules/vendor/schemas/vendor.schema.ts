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

   // its about egyptian phone number
   @Prop({ required: true, maxlength: 11, minlength: 11 })
   phoneNumber: string;

   // @Prop({ type: Types.ObjectId, ref: 'Address' })
   // address: Types.ObjectId;

   @Prop({ required: true })
   address: string;

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

VendorSchema.pre('save', async function (next) {
   try {
      if (!this.isModified('password') || !this.password) {
         return next();
      }

      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
   } catch (error) {
      next(error);
   }
});
export type VendorDocument = Vendor & Document;
