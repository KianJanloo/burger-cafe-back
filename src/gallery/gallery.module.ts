import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { GalleryCategory } from './entities/gallery-category.entity';
import { GalleryItem } from './entities/gallery-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GalleryCategory, GalleryItem])],
  controllers: [GalleryController],
  providers: [GalleryService],
  exports: [GalleryService],
})
export class GalleryModule {}
