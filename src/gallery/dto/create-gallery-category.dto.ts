import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryCategoryDto {
  @ApiProperty({
    description: 'Name of the gallery category',
    example: 'Food Gallery',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the gallery category',
    example: 'Collection of our delicious food items',
    required: false,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  description?: string;
}
