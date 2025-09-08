import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cafe_details')
export class CafeDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  kindOfBurgers: number;

  @Column({ nullable: false })
  experience: number; // years

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  rate: number;

  @Column({ nullable: false })
  customers: number;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
