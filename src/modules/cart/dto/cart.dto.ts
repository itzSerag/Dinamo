import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import {Types } from 'mongoose';

export class AddToCartDTO {
   @IsString()
   @IsNotEmpty()
   productId: string | Types.ObjectId

   @IsNumber()
   @Min(1)
   quantity: number;
}
