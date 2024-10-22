import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { CartModule } from './modules/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
   imports: [
      AuthModule,
      UserModule,
      ProductModule,
      VendorModule,
      CartModule,
   
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      MongooseModule.forRoot(process.env.MONGO_URI),
   ],

   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
