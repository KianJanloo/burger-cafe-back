import { ConfigModule, ConfigService } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', '1388ki8831'),
        database: configService.get<string>('DB_NAME', 'postgres'),
        entities: [`${__dirname}/**/*.entity{.ts,.js}`],
        synchronize: configService.get<string>('NODE_ENV') === 'development',
        logging: configService.get<string>('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
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
