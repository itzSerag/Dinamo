import {
   IsString,
   IsNotEmpty,
   IsNumber,
   IsArray,
   IsOptional,
} from 'class-validator';

export class CreateProductDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   description: string;

   @IsNumber()
   @IsNotEmpty()
   price: number;


   @IsNumber()
   @IsNotEmpty()
   stock: number;

   @IsArray()
   @IsString({ each: true })
   @IsOptional()
   categories?: string[];

   @IsArray()
   @IsString({ each: true })
   @IsOptional()
   images_url?: string[];
}

export class UpdateProductDTO {
   @IsString()
   @IsOptional()
   name?: string;

   @IsString()
   @IsOptional()
   description?: string;

   @IsNumber()
   @IsOptional()
   price?: number;

   @IsArray()
   @IsString({ each: true })
   @IsOptional()
   categories?: string[];

   @IsArray()
   @IsString({ each: true })
   @IsOptional()
   images_url?: string[];
}
