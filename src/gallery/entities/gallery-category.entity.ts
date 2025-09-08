import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { GalleryItem } from './gallery-item.entity';

@Entity()
export class GalleryCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => GalleryItem, (item) => item.category)
  items: GalleryItem[];

  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
