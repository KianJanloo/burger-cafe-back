import { webcrypto } from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as Crypto;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Burger Cafe API')
    .setDescription(
      `
      A comprehensive restaurant management system API for Burger Cafe.
      
      ## Features
      - **Menu Management** - Complete CRUD operations for menu items
      - **Order Management** - Handle orders with status tracking and filtering
      - **Reservation System** - Manage table reservations with date filtering
      - **Shopping Cart** - Session-based cart management
      - **About Us** - Story and team member management
      - **Cafe Details** - Statistics and information management
      - **FAQ System** - Frequently asked questions with admin/public views
      - **Contact Management** - Handle customer inquiries with status tracking
      - **Comments System** - Customer reviews and feedback
      - **Footer Management** - Contact information and social media links
      - **Gallery** - Image gallery with categories
      
      ## Authentication
      This API currently does not require authentication for most endpoints.
      
      ## Base URL
      The API is available at: \`http://localhost:3000\`
    `,
    )
    .setVersion('1.0.0')
    .addTag('App', 'Application health and environment endpoints')
    .addTag('Menu', 'Menu items management')
    .addTag('Orders', 'Order management and tracking')
    .addTag('Reservations', 'Table reservation system')
    .addTag('Cart', 'Shopping cart management')
    .addTag('About Us', 'Story and team member management')
    .addTag('Contact Us', 'Customer inquiry management')
    .addTag('Comments', 'Customer reviews and feedback')
    .addTag('FAQ', 'Frequently asked questions')
    .addTag('Gallery', 'Image gallery management')
    .addTag('Footer', 'Footer content management')
    .addTag('Cafe Details', 'Cafe statistics and information')
    .addServer('http://localhost:3000', 'Development server')
    .addServer('https://api.burger-cafee.netlify.app', 'Production server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
