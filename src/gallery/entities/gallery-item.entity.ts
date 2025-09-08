import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { GalleryCategory } from './gallery-category.entity';

@Entity()
export class GalleryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  categoryId: number;

  @ManyToOne(() => GalleryCategory, (category) => category.items)
  @JoinColumn({ name: 'categoryId' })
  category: GalleryCategory;

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
