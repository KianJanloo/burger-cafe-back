import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFooterDto } from './create-footer.dto';

export class UpdateFooterDto extends PartialType(CreateFooterDto) {
  @ApiProperty({
    description: 'ID of the footer information to update',
    example: 1,
    required: false
  })
  id?: number;
}
