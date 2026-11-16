import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan validasi otomatis untuk semua DTO
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Konfigurasi Swagger
  const config = new DocumentBuilder()
    .setTitle('Wisataku API')
    .setDescription('Dokumentasi API Wisataku')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Mengaktifkan port akses agar bisa dibuka di browser
  await app.listen(process.env.PORT ?? 3000);
  console.log('Aplikasi NestJS berjalan di http://localhost:3000');
  console.log('Swagger di http://localhost:3000/api/docs');
}
bootstrap();