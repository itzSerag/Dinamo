import { Module, forwardRef } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vendor, VendorSchema } from './schemas/vendor.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [VendorService],
  controllers: [VendorController],
  imports: [
    MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
    forwardRef(() => AuthModule),
  ],
  exports: [VendorService, MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }])],
})
export class VendorModule {}