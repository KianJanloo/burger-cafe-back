import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  orderNumber: string;

  @Column({ nullable: false })
  customerName: string;

  @Column({ nullable: false })
  customerPhone: string;

  @Column({ nullable: true })
  customerEmail: string;

  @Column({
    type: 'enum',
    enum: ['dine_in', 'takeaway', 'delivery'],
    nullable: false,
  })
  orderType: string;

  @Column({ type: 'json', nullable: false })
  items: any[]; // Array of food items with quantities

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  deliveryFee: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total: number;

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

  @Column({ type: 'text', nullable: true })
  specialInstructions: string;

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ nullable: true })
  estimatedDeliveryTime: Date;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
