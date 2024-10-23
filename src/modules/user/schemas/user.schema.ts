import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { AuthProviders, Role } from '../../../common/enums';

@Schema({
   timestamps: true,
   toJSON: {
      transform: (_, ret) => {
         // Remove the password from the response
         delete ret.password;
         return ret;
      },
   },
})
export class User extends Document {
   @Prop({ required: true, trim: true })
   firstName: string;

   @Prop({ required: true, trim: true })
   lastName: string;

   @Prop({
      required: true,
      unique: true,
      trim: true,
      index: true,
   })
   phoneNumber: string;

   @Prop({
      required: false,
   })
   socialId?: string; // Allow undefined instead of null

   @Prop({ default: false })
   isVerified: boolean;

   // Lets make it just one address and string -- already git the address schema with me but as u know 2 days only
   @Prop({ required: false })
   address: string;

   @Prop({
      type: Types.ObjectId,
      ref: 'Cart',
      default: null,
   })
   activeCart: Types.ObjectId;

   // Password for local login
   @Prop({
      required: false,
      minlength: 6,
   })
   password?: string;

   @Prop({
      required: true,
      default: AuthProviders.LOCAL,
      enum: AuthProviders,
   })
   provider: AuthProviders;

   @Prop({
      default: Role.USER,
      enum: Role,
      required: true,
   })
   role: Role;

   // Virtual for full name
   get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
   }

   // Instance method for password validation
   async validatePassword(password: string): Promise<boolean> {
      if (!this.password) return false;
      return await bcrypt.compare(password, this.password);
   }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Add virtuals
UserSchema.virtual('fullName').get(function () {
   return `${this.firstName} ${this.lastName}`;
});

// Add instance methods
UserSchema.methods.validatePassword = async function (
   password: string,
): Promise<boolean> {
   if (!this.password) return false;
   return await bcrypt.compare(password, this.password);
};

   // HASHINGG
UserSchema.pre('save', async function (next) {
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
