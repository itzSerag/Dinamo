import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDTO {
   @IsString()
   @IsNotEmpty()
   firstName: string;

   @IsString()
   @IsNotEmpty()
   lastName: string;

   // must be lenfth of 11

   @IsString()
   @IsNotEmpty()
   @Length(11, 11)
   phoneNumber: string;

   @IsString()
   @IsNotEmpty()
   password: string;
}
