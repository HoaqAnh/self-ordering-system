import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://www.selforder.site',
      'https://selforder.site',
      'https://self-ordering-customer.vercel.app',
      'https://self-ordering-admin.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  return app;
}

type VercelHandler = (req: any, res: any) => any;

let cachedServer: VercelHandler;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    const app = await bootstrap();
    await app.init();
    cachedServer = app.getHttpAdapter().getInstance() as VercelHandler;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return cachedServer(req, res);
}

if (process.env.VERCEL !== '1') {
  bootstrap()
    .then(async (app) => {
      await app.listen(process.env.PORT ?? 3000);
      console.log(
        `🚀 NestJS local server is running on http://localhost:${process.env.PORT ?? 3000}`,
      );
    })
    .catch((err) => {
      console.error('Lỗi khi khởi động server:', err);
    });
}
