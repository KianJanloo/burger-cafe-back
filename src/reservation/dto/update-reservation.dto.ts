import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty({
    description: 'ID of the reservation to update',
    example: 1,
    required: false
  })
  id?: number;

  @ApiProperty({
    description: 'New status of the reservation',
    example: 'confirmed',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    required: false
  })
  status?: string;
}
