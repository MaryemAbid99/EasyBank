import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS pour autoriser le frontend (port 3001)
  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  //  validation globale (DTOs)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les champs non définis dans les DTOs
      forbidNonWhitelisted: true, // Lève une erreur si des champs inconnus sont envoyés
      transform: true, 
    }),
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('EasyBank API')
    .setDescription('API de gestion des utilisateurs et articles - Technical Assessment')
    .setVersion('1.0')
    .addBearerAuth() //routes protégées par JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application running on: http://localhost:${port}`);
  console.log(`Swagger docs available at: http://localhost:${port}/api`);
  console.log(`CORS activé pour http://localhost:3001`);
}

bootstrap();
