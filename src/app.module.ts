import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env'],
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 5432),
          username: configService.get('DB_USERNAME', 'postgres'),
          password: configService.get('DB_PASSWORD', '1388ki8831'),
          database: configService.get('DB_NAME', 'postgres'),
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          synchronize: true,
          logging: true,
        };
      },
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
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
