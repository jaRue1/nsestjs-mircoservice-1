// root file that will bootstrap the entire app
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')// set a global prefix so that all endpoints follow http://localhost:8000/api/*
  await app.listen(8000);
}
bootstrap();
