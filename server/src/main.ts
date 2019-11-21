import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { json } from 'body-parser';
import { join } from 'path';

import { ConfigService } from './config/config.service';
import { AppModule } from './app/app.module';

/**
 * [bootstrap description]
 */
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = await new ConfigService();
  const options = await new DocumentBuilder()
    .setTitle('')
    .setDescription('')
    .setBasePath(config.getSetting('API_PREFFIX'))
    .setVersion(config.getSetting('npm_package_version'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(config.getSetting('API_DOCS'), app, document);

  return await app
    .use(json())
    .useStaticAssets(join(__dirname, '..', 'public'))
    .setBaseViewsDir(join(__dirname, '..', 'public'))
    .setGlobalPrefix(config.getSetting('API_PREFFIX'))
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    )
    .enableCors()
    .listen(config.getSetting('API_PORT'));
}

bootstrap();
