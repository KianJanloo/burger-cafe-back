import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { CommentsModule } from './comments/comments.module';
import { FooterModule } from './footer/footer.module';
import { CafeDetailsModule } from './cafe-details/cafe-details.module';
import { AboutUsModule } from './about-us/about-us.module';
import { GalleryModule } from './gallery/gallery.module';
import { ReservationModule } from './reservation/reservation.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { FaqModule } from './faq/faq.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '1388ki8831',
      database: process.env.DB_NAME || 'postgres',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      ssl: process.env.NODE_ENV === 'production',
    }),
    MenuModule,
    CommentsModule,
    FooterModule,
    CafeDetailsModule,
    AboutUsModule,
    GalleryModule,
    ReservationModule,
    ContactUsModule,
    FaqModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
