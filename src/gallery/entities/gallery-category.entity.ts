import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { GalleryItem } from './gallery-item.entity';

@Entity('gallery_categories')
export class GalleryCategory {
  @ApiProperty({
    description: 'Unique identifier for the gallery category',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the gallery category',
    example: 'Food Gallery',
    maxLength: 100
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'Description of the gallery category',
    example: 'Collection of our delicious food items',
    maxLength: 500,
    required: false
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Gallery items belonging to this category',
    type: () => [GalleryItem],
    required: false
  })
  @OneToMany(() => GalleryItem, (item) => item.category)
  items: GalleryItem[];

  @ApiProperty({
    description: 'Date and time when the category was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the category was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
