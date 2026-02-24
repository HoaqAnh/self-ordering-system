import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export async function createApp() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://www.selforder.site',
      'https://selforder.site',
      'https://self-ordering-customer.vercel.app',
      'https://self-ordering-admin.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');

  await app.init();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return app.getHttpAdapter().getInstance();
}
