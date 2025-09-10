import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('orders')
export class Order {
  @ApiProperty({
    description: 'Unique identifier for the order',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Unique order number for tracking',
    example: 'ORD-2024-001',
    maxLength: 50
  })
  @Column({ nullable: false })
  orderNumber: string;

  @ApiProperty({
    description: 'Name of the customer who placed the order',
    example: 'John Doe',
    maxLength: 100
  })
  @Column({ nullable: false })
  customerName: string;

  @ApiProperty({
    description: 'Phone number of the customer',
    example: '+1234567890',
    maxLength: 20
  })
  @Column({ nullable: false })
  customerPhone: string;

  @ApiProperty({
    description: 'Email address of the customer',
    example: 'john.doe@example.com',
    maxLength: 100,
    required: false
  })
  @Column({ nullable: true })
  customerEmail: string;

  @ApiProperty({
    description: 'Type of order',
    example: 'dine_in',
    enum: ['dine_in', 'takeaway', 'delivery']
  })
  @Column({
    type: 'enum',
    enum: ['dine_in', 'takeaway', 'delivery'],
    nullable: false,
  })
  orderType: string;

  @ApiProperty({
    description: 'Array of items in the order with quantities and details',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        menuItemId: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Classic Burger' },
        price: { type: 'number', example: 12.99 },
        quantity: { type: 'number', example: 2 },
        specialInstructions: { type: 'string', example: 'No pickles' }
      }
    }
  })
  @Column({ type: 'json', nullable: false })
  items: any[]; // Array of food items with quantities

  @ApiProperty({
    description: 'Subtotal amount before tax and delivery fee',
    example: 25.98,
    type: 'number',
    format: 'decimal'
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @ApiProperty({
    description: 'Delivery fee (only for delivery orders)',
    example: 3.99,
    type: 'number',
    format: 'decimal',
    default: 0
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  deliveryFee: number;

  @ApiProperty({
    description: 'Tax amount',
    example: 2.60,
    type: 'number',
    format: 'decimal',
    default: 0
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  tax: number;

  @ApiProperty({
    description: 'Total amount including tax and delivery fee',
    example: 32.57,
    type: 'number',
    format: 'decimal'
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

  @ApiProperty({
    description: 'Current status of the order',
    example: 'pending',
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  })
  @Column({
    type: 'enum',
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'delivered',
      'cancelled',
    ],
    default: 'pending',
  })
  status: string;

  @ApiProperty({
    description: 'Special instructions for the entire order',
    example: 'Please call when ready',
    maxLength: 500,
    required: false
  })
  @Column({ type: 'text', nullable: true })
  specialInstructions: string;

  @ApiProperty({
    description: 'Delivery address (for delivery orders)',
    example: '123 Main St, City, State 12345',
    maxLength: 200,
    required: false
  })
  @Column({ nullable: true })
  deliveryAddress: string;

  @ApiProperty({
    description: 'Estimated delivery time',
    example: '2024-01-15T12:30:00.000Z',
    type: 'string',
    format: 'date-time',
    required: false
  })
  @Column({ nullable: true })
  estimatedDeliveryTime: Date;

  @ApiProperty({
    description: 'Date and time when the order was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the order was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
