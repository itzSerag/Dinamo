import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
   @IsString()
   @IsNotEmpty()
   firstName: string;

   @IsString()
   @IsNotEmpty()
   lastName: string;

   @IsString()
   @IsNotEmpty()
   phoneNumber: string;

   @IsString()
   @IsNotEmpty()
   password: string;
}
