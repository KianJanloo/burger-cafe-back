import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Name of the menu item',
    example: 'Classic Burger',
    minLength: 1,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Price of the menu item',
    example: '$12.99',
    minLength: 1,
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: 'Description of the menu item',
    example: 'A delicious classic burger with fresh lettuce, tomato, and our special sauce',
    minLength: 1,
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'URL or path to the menu item image',
    example: 'https://example.com/images/classic-burger.jpg',
    minLength: 1,
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Category of the menu item',
    example: 'Burgers',
    enum: ['Burgers', 'Sides', 'Drinks', 'Desserts', 'Salads']
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Preparation time in minutes',
    example: 15,
    minimum: 1,
    maximum: 120
  })
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @ApiProperty({
    description: 'Rating of the menu item (0-5)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    required: false,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({
    description: 'Whether the menu item is currently available',
    example: true,
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
