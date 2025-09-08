import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('food')
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false, default: true })
  isAvailable: boolean;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  duration: number; // minutes

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
