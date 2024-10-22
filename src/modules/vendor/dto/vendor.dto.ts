import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateVendorDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsString()
   @IsNotEmpty()
   @Length(11, 11)
   phoneNumber: string;

   @IsString()
   @IsNotEmpty()
   @Length(6, 20)
   password: string;

   @IsString()
   @IsNotEmpty()
   address: string;
}

export class UpdateVendorDTO {
   @IsString()
   @IsNotEmpty()
   name?: string;

   @IsEmail()
   @IsNotEmpty()
   email?: string;

   @IsString()
   @IsNotEmpty()
   phoneNumber?: string;

   @IsString()
   @IsNotEmpty()
   address?: string;
}

export class LoginVendorDTO {
   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsString()
   @IsNotEmpty()
   password: string;
}
