import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sessionId: string;

  @Column({ nullable: false })
  foodId: number;

  @Column({ nullable: false })
  foodName: string;

  @Column({ nullable: false })
  foodPrice: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  totalPrice: number;

  @Column({ nullable: true })
  specialInstructions: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
