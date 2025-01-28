import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, '..', 'transcodes'), {
    prefix: '/transcodes/',
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, Content-Type, Accept',
      );
    },
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,POST',
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
