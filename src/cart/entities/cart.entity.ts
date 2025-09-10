import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cart')
export class Cart {
  @ApiProperty({
    description: 'Unique identifier for the cart item',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Unique session ID for the cart',
    example: 'sess_1234567890abcdef',
    maxLength: 100
  })
  @Column({ nullable: false })
  sessionId: string;

  @ApiProperty({
    description: 'ID of the food item',
    example: 1,
    type: 'integer'
  })
  @Column({ nullable: false })
  foodId: number;

  @ApiProperty({
    description: 'Name of the food item',
    example: 'Classic Burger',
    maxLength: 100
  })
  @Column({ nullable: false })
  foodName: string;

  @ApiProperty({
    description: 'Price of the food item',
    example: 12.99,
    type: 'number',
    format: 'decimal'
  })
  @Column({ nullable: false })
  foodPrice: number;

  @ApiProperty({
    description: 'Quantity of the food item',
    example: 2,
    minimum: 1,
    maximum: 10
  })
  @Column({ nullable: false })
  quantity: number;

  @ApiProperty({
    description: 'Total price for this cart item (foodPrice * quantity)',
    example: 25.98,
    type: 'number',
    format: 'decimal'
  })
  @Column({ nullable: false })
  totalPrice: number;

  @ApiProperty({
    description: 'Special instructions for this item',
    example: 'No pickles, extra cheese',
    maxLength: 200,
    required: false
  })
  @Column({ nullable: true })
  specialInstructions: string;

  @ApiProperty({
    description: 'Date and time when the item was added to cart',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the cart item was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
