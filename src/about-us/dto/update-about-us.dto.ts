import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAboutUsDto } from './create-about-us.dto';

export class UpdateAboutUsDto extends PartialType(CreateAboutUsDto) {
  @ApiProperty({
    description: 'ID of the about us story to update',
    example: 1,
    required: false
  })
  id?: number;
}
