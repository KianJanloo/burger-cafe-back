import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFaqDto } from './create-faq.dto';

export class UpdateFaqDto extends PartialType(CreateFaqDto) {
  @ApiProperty({
    description: 'ID of the FAQ item to update',
    example: 1,
    required: false
  })
  id?: number;
}
