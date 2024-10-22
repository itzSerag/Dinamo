import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorSchema } from './schemas/vendor.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
   providers: [VendorService],
   controllers: [VendorController],
   imports: [
      MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]),
      AuthModule,
   ],
   // allowing the other modules to import the VendorService and MongooseModule
   exports: [VendorService, MongooseModule],
})
export class VendorModule {}
