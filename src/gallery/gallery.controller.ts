import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryCategoryDto } from './dto/create-gallery-category.dto';
import { UpdateGalleryCategoryDto } from './dto/update-gallery-category.dto';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  // Gallery Category endpoints
  @Post('categories')
  createCategory(@Body() createGalleryCategoryDto: CreateGalleryCategoryDto) {
    return this.galleryService.createCategory(createGalleryCategoryDto);
  }

  @Get('categories')
  findAllCategories() {
    return this.galleryService.findAllCategories();
  }

  @Get('categories/:id')
  findOneCategory(@Param('id') id: string) {
    return this.galleryService.findOneCategory(+id);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id') id: string, @Body() updateGalleryCategoryDto: UpdateGalleryCategoryDto) {
    return this.galleryService.updateCategory(+id, updateGalleryCategoryDto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id') id: string) {
    return this.galleryService.removeCategory(+id);
  }

  // Gallery Item endpoints
  @Post('items')
  createItem(@Body() createGalleryItemDto: CreateGalleryItemDto) {
    return this.galleryService.createItem(createGalleryItemDto);
  }

  @Get('items')
  findAllItems() {
    return this.galleryService.findAllItems();
  }

  @Get('items/category/:categoryId')
  findItemsByCategory(@Param('categoryId') categoryId: string) {
    return this.galleryService.findItemsByCategory(+categoryId);
  }

  @Get('items/:id')
  findOneItem(@Param('id') id: string) {
    return this.galleryService.findOneItem(+id);
  }

  @Patch('items/:id')
  updateItem(@Param('id') id: string, @Body() updateGalleryItemDto: UpdateGalleryItemDto) {
    return this.galleryService.updateItem(+id, updateGalleryItemDto);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.galleryService.removeItem(+id);
  }
}
