import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryItemDto {
  @ApiProperty({
    description: 'Title of the gallery item',
    example: 'Classic Burger',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the gallery item',
    example: 'Our signature burger with fresh ingredients',
    required: false,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL or path to the gallery item image',
    example: 'https://example.com/images/burger.jpg',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'ID of the gallery category this item belongs to',
    example: 1,
    type: 'integer'
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
