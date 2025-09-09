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
import { CartModule } from './cart/cart.module';
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
        // Log environment variables used for TypeORM configuration (in English)
        console.log('TypeORM config:');
        console.log('DB_HOST:', configService.get('DB_HOST', 'localhost'));
        console.log('DB_PORT:', configService.get('DB_PORT', 5432));
        console.log(
          'DB_USERNAME:',
          configService.get('DB_USERNAME', 'postgres'),
        );
        console.log(
          'DB_PASSWORD:',
          configService.get('DB_PASSWORD', '1388ki8831'),
        );
        console.log('DB_NAME:', configService.get('DB_NAME', 'postgres'));
        console.log('NODE_ENV:', configService.get('NODE_ENV'));
        return {
          type: 'postgres',
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 5432),
          username: configService.get('DB_USERNAME', 'postgres'),
          password: configService.get('DB_PASSWORD', '1388ki8831'),
          database: configService.get('DB_NAME', 'postgres'),
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          synchronize: configService.get('NODE_ENV') === 'development',
          logging: configService.get('NODE_ENV') === 'development',
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
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
