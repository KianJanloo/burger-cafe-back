import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('about_us')
export class AboutUs {
  @ApiProperty({
    description: 'Unique identifier for the about us story',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The story content for the About Us section',
    example: 'Founded in 2020, Burger Cafe started as a small family business with a passion for creating the most delicious burgers in town.',
    maxLength: 2000
  })
  @Column({ type: 'text', nullable: false })
  story: string;

  @ApiProperty({
    description: 'Date and time when the story was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the story was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
