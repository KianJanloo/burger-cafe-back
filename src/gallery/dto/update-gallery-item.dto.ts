import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateGalleryItemDto } from './create-gallery-item.dto';

export class UpdateGalleryItemDto extends PartialType(CreateGalleryItemDto) {
  @ApiProperty({
    description: 'ID of the gallery item to update',
    example: 1,
    required: false
  })
  id?: number;
}
