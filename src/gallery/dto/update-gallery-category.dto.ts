import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGalleryCategoryDto } from './create-gallery-category.dto';

export class UpdateGalleryCategoryDto extends PartialType(CreateGalleryCategoryDto) {
  @ApiProperty({
    description: 'ID of the gallery category to update',
    example: 1,
    required: false
  })
  id?: number;
}
