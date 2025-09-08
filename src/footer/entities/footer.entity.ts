import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('footer')
export class Footer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  workTime: string;

  @Column({ nullable: false })
  currentLocation: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
