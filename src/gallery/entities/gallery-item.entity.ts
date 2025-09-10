import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GalleryCategory } from './gallery-category.entity';

@Entity('gallery_items')
export class GalleryItem {
  @ApiProperty({
    description: 'Unique identifier for the gallery item',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Title of the gallery item',
    example: 'Classic Burger',
    maxLength: 100
  })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    description: 'Description of the gallery item',
    example: 'Our signature burger with fresh ingredients',
    maxLength: 500,
    required: false
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'URL or path to the gallery item image',
    example: 'https://example.com/images/burger.jpg',
    maxLength: 500
  })
  @Column({ nullable: false })
  image: string;

  @ApiProperty({
    description: 'ID of the gallery category this item belongs to',
    example: 1,
    type: 'integer'
  })
  @Column({ nullable: false })
  categoryId: number;

  @ApiProperty({
    description: 'Gallery category this item belongs to',
    type: () => GalleryCategory,
    required: false
  })
  @ManyToOne(() => GalleryCategory, (category) => category.items)
  @JoinColumn({ name: 'categoryId' })
  category: GalleryCategory;

  @ApiProperty({
    description: 'Date and time when the item was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the item was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
