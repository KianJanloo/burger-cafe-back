import { IsNotEmpty, IsString, IsEmail, IsEnum, IsArray, IsNumber, IsOptional, IsDecimal, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Name of the customer placing the order',
    example: 'John Doe',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+1234567890',
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'john.doe@example.com',
    required: false,
    maxLength: 100
  })
  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @ApiProperty({
    description: 'Type of order',
    example: 'dine_in',
    enum: ['dine_in', 'takeaway', 'delivery']
  })
  @IsEnum(['dine_in', 'takeaway', 'delivery'])
  @IsNotEmpty()
  orderType: string;

  @ApiProperty({
    description: 'Array of items in the order',
    type: [Object],
    example: [
      {
        menuItemId: 1,
        name: 'Classic Burger',
        price: 12.99,
        quantity: 2,
        specialInstructions: 'No pickles'
      }
    ]
  })
  @IsArray()
  @IsNotEmpty()
  items: any[];

  @ApiProperty({
    description: 'Subtotal amount before tax and delivery fee',
    example: 25.98,
    type: 'number',
    format: 'decimal'
  })
  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @ApiProperty({
    description: 'Delivery fee (only for delivery orders)',
    example: 3.99,
    type: 'number',
    format: 'decimal',
    required: false,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  deliveryFee?: number;

  @ApiProperty({
    description: 'Tax amount',
    example: 2.60,
    type: 'number',
    format: 'decimal',
    required: false,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  tax?: number;

  @ApiProperty({
    description: 'Total amount including tax and delivery fee',
    example: 32.57,
    type: 'number',
    format: 'decimal'
  })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty({
    description: 'Special instructions for the entire order',
    example: 'Please call when ready',
    required: false,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @ApiProperty({
    description: 'Delivery address (required for delivery orders)',
    example: '123 Main St, City, State 12345',
    required: false,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  deliveryAddress?: string;
}
