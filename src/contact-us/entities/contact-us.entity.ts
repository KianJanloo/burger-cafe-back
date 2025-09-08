import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactUs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  subject: string;

  @Column({ type: 'text', nullable: false })
  message: string;

  @Column({ 
    type: 'enum', 
    enum: ['pending', 'in_progress', 'resolved', 'closed'], 
    default: 'pending' 
  })
  status: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
