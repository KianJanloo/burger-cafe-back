import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryCategory } from './entities/gallery-category.entity';
import { GalleryItem } from './entities/gallery-item.entity';
import { CreateGalleryCategoryDto } from './dto/create-gallery-category.dto';
import { UpdateGalleryCategoryDto } from './dto/update-gallery-category.dto';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryCategory)
    private galleryCategoryRepository: Repository<GalleryCategory>,
    @InjectRepository(GalleryItem)
    private galleryItemRepository: Repository<GalleryItem>,
  ) {}

  // Gallery Category methods
  async createCategory(createGalleryCategoryDto: CreateGalleryCategoryDto): Promise<GalleryCategory> {
    const category = this.galleryCategoryRepository.create(createGalleryCategoryDto);
    return this.galleryCategoryRepository.save(category);
  }

  async findAllCategories(): Promise<GalleryCategory[]> {
    return this.galleryCategoryRepository.find({ relations: ['items'] });
  }

  async findOneCategory(id: number): Promise<GalleryCategory> {
    const category = await this.galleryCategoryRepository.findOne({ 
      where: { id }, 
      relations: ['items'] 
    });
    if (!category) {
      throw new NotFoundException('Gallery category not found');
    }
    return category;
  }

  async updateCategory(id: number, updateGalleryCategoryDto: UpdateGalleryCategoryDto): Promise<GalleryCategory> {
    await this.galleryCategoryRepository.update(id, updateGalleryCategoryDto);
    return this.findOneCategory(id);
  }

  async removeCategory(id: number): Promise<{ message: string }> {
    const category = await this.findOneCategory(id);
    if (!category) {
      throw new NotFoundException('Gallery category not found');
    }
    await this.galleryCategoryRepository.delete(id);
    return {
      message: 'Gallery category deleted successfully',
    };
  }

  // Gallery Item methods
  async createItem(createGalleryItemDto: CreateGalleryItemDto): Promise<GalleryItem> {
    const item = this.galleryItemRepository.create(createGalleryItemDto);
    return this.galleryItemRepository.save(item);
  }

  async findAllItems(): Promise<GalleryItem[]> {
    return this.galleryItemRepository.find({ relations: ['category'] });
  }

  async findItemsByCategory(categoryId: number): Promise<GalleryItem[]> {
    return this.galleryItemRepository.find({ 
      where: { categoryId }, 
      relations: ['category'] 
    });
  }

  async findOneItem(id: number): Promise<GalleryItem> {
    const item = await this.galleryItemRepository.findOne({ 
      where: { id }, 
      relations: ['category'] 
    });
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    return item;
  }

  async updateItem(id: number, updateGalleryItemDto: UpdateGalleryItemDto): Promise<GalleryItem> {
    await this.galleryItemRepository.update(id, updateGalleryItemDto);
    return this.findOneItem(id);
  }

  async removeItem(id: number): Promise<{ message: string }> {
    const item = await this.findOneItem(id);
    if (!item) {
      throw new NotFoundException('Gallery item not found');
    }
    await this.galleryItemRepository.delete(id);
    return {
      message: 'Gallery item deleted successfully',
    };
  }
}
