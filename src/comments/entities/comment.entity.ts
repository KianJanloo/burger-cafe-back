import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  authorName: string;

  @Column({ nullable: true })
  authorJob: string;

  @Column({ nullable: true })
  authorImage: string;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
