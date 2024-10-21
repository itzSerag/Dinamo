import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

enum AuthProvider {
   LOCAL = 'local',
   GOOGLE = 'google',
   FACEBOOK = 'facebook',
}

@Schema({ timestamps: true })
export class User extends Document {
   @Prop({ required: true })
   firstName: string;

   @Prop({ required: true })
   lastName: string;

   // false for now because we already have Outh
   // if the app for only specific country, we can make it specific length // for this country
   @Prop({ required: false, unique: true })
   phoneNumber: string;

   @Prop({ required: false })
   socialId?: string;

   @Prop({ default: false })
   isVerified: boolean;

   @Prop({ type: [{ type: Types.ObjectId, ref: 'Address' }] })
   addresses: Types.ObjectId[];

   @Prop({ type: Types.ObjectId, ref: 'Cart' })
   activeCart: Types.ObjectId;

   /* making it optional for Outh users (for now) // 
  will be required in DTOs in login/signup path with local strategy
  */
   @Prop({})
   password?: string;

   @Prop({ required: true, default: AuthProvider.LOCAL })
   provider: AuthProvider;

   async validatePassword(password: string): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
   }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
   password: string,
): Promise<boolean> {
   return await bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
   // hash it when its new or modified else ---> keep goin
   if (!this.isModified('password') || !this.password) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});
