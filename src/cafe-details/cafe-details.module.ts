import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeDetailsService } from './cafe-details.service';
import { CafeDetailsController } from './cafe-details.controller';
import { CafeDetails } from './entities/cafe-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CafeDetails])],
  controllers: [CafeDetailsController],
  providers: [CafeDetailsService],
  exports: [CafeDetailsService],
})
export class CafeDetailsModule {}
