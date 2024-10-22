import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);

   app.enableCors({
      origin: '*',
      credentials: true,
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
   });

   app.setGlobalPrefix('api');

   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         // transform: true,
      }),
   );

   await app.listen(process.env.PORT || 5000);
}
bootstrap();
