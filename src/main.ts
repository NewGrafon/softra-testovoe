import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { checkEnvironment } from './common/functions/env-checker.function';

async function bootstrap() {
  config();

  checkEnvironment(process.env);

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.useBodyParser('json', { limit: '4mb' });
  app.enableCors({ credentials: true, origin: true });

  await app.listen(3000 /*process.env[EnvNamesEnum.port]*/);
}

bootstrap();
