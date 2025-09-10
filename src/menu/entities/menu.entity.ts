import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('food')
export class Food {
  @ApiProperty({
    description: 'Unique identifier for the menu item',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the menu item',
    example: 'Classic Burger',
    maxLength: 100
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'Price of the menu item',
    example: '$12.99',
    maxLength: 20
  })
  @Column({ nullable: false })
  price: string;

  @ApiProperty({
    description: 'Description of the menu item',
    example: 'A delicious classic burger with fresh lettuce, tomato, and our special sauce',
    maxLength: 500
  })
  @Column({ nullable: false })
  description: string;

  @ApiProperty({
    description: 'URL or path to the menu item image',
    example: 'https://example.com/images/classic-burger.jpg',
    maxLength: 500
  })
  @Column({ nullable: false })
  image: string;

  @ApiProperty({
    description: 'Rating of the menu item (0-5)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    default: 0
  })
  @Column({ nullable: false, default: 0 })
  rating: number;

  @ApiProperty({
    description: 'Whether the menu item is currently available',
    example: true,
    default: true
  })
  @Column({ nullable: false, default: true })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Category of the menu item',
    example: 'Burgers',
    enum: ['Burgers', 'Sides', 'Drinks', 'Desserts', 'Salads']
  })
  @Column({ nullable: false })
  category: string;

  @ApiProperty({
    description: 'Preparation time in minutes',
    example: 15,
    minimum: 1,
    maximum: 120
  })
  @Column({ nullable: false })
  duration: number; // minutes

  @ApiProperty({
    description: 'Date and time when the menu item was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the menu item was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
