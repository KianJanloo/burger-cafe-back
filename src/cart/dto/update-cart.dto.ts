import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty({
    description: 'ID of the cart item to update',
    example: 1,
    required: false
  })
  id?: number;
}
