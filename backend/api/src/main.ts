import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import morgan from 'morgan';
import { PORT } from '../../../config/constants';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const reflector = app.get(Reflector);

  app.use(morgan('dev'));
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.enableCors(CORS);
  app.setGlobalPrefix(globalPrefix);
  initSwagger(app);

  await app.listen(PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${PORT}/${globalPrefix}`
  );
}

bootstrap();
