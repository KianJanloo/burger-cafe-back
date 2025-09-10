import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    description: 'ID of the order to update',
    example: 1,
    required: false
  })
  id?: number;

  @ApiProperty({
    description: 'New status of the order',
    example: 'confirmed',
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    required: false
  })
  status?: string;
}
