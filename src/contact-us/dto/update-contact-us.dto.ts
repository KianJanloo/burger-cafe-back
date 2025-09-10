import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateContactUsDto } from './create-contact-us.dto';

export class UpdateContactUsDto extends PartialType(CreateContactUsDto) {
  @ApiProperty({
    description: 'ID of the contact inquiry to update',
    example: 1,
    required: false
  })
  id?: number;

  @ApiProperty({
    description: 'New status of the inquiry',
    example: 'in_progress',
    enum: ['pending', 'in_progress', 'resolved', 'closed'],
    required: false
  })
  status?: string;
}
