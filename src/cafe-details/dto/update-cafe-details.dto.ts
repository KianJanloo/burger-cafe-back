import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCafeDetailsDto } from './create-cafe-details.dto';

export class UpdateCafeDetailsDto extends PartialType(CreateCafeDetailsDto) {
  @ApiProperty({
    description: 'ID of the cafe details to update',
    example: 1,
    required: false
  })
  id?: number;
}
