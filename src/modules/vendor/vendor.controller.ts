import { Body, Controller, Post } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDTO, LoginVendorDTO } from './dto';
import { log } from 'console';

@Controller('vendor')
export class VendorController {
   constructor(private vendorService: VendorService) {}

   @Post('signup')
   async signUp(@Body() createVendorDto: CreateVendorDTO) {
      const jwt = await this.vendorService.createVendor(createVendorDto);
      if (!jwt) {
         throw new Error('Error creating vendor');
      }
      return { access_token: jwt };
   }

   @Post('login')
   async login(@Body() loginVendorDto: LoginVendorDTO) {
      log('Login Vendor DTO');
      const jwt = await this.vendorService.login(loginVendorDto);
      if (!jwt) {
         throw new Error('Error creating vendor');
      }
      return { access_token: jwt };
   }
}
