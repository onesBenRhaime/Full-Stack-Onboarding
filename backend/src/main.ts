import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config();

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://full-stack-onboarding.vercel.app',
      'https://e-commerce-blue-sigma.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port', process.env.PORT || 5000);
  });
}

bootstrap();
