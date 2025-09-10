import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({
    description: 'ID of the menu item',
    example: 1,
    type: 'integer'
  })
  @IsNumber()
  @IsNotEmpty()
  menuItemId: number;

  @ApiProperty({
    description: 'Name of the menu item',
    example: 'Classic Burger',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Price of the menu item',
    example: 12.99,
    type: 'number',
    format: 'decimal'
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    description: 'Quantity of the item',
    example: 2,
    minimum: 1,
    maximum: 10
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Special instructions for this item',
    example: 'No pickles, extra cheese',
    required: false,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  specialInstructions?: string;
}
