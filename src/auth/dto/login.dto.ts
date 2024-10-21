import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
   @IsString()
   @IsNotEmpty()
   phoneNumber: string;

   // we can set as we want the length of the password
   @IsString()
   @IsNotEmpty()
   password: string;
}
