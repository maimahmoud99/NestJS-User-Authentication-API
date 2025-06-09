import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import configuration from './config/configuration';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 

  const config = configuration();

  app.use(helmet()); 
  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  Logger.log(`🚀 Server is running on port ${config.port}`, 'Bootstrap');
  await app.listen(config.port);
}
bootstrap();
