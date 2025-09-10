import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('faq')
export class Faq {
  @ApiProperty({
    description: 'Unique identifier for the FAQ item',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The frequently asked question',
    example: 'What are your opening hours?',
    maxLength: 500
  })
  @Column({ nullable: false })
  question: string;

  @ApiProperty({
    description: 'The answer to the frequently asked question',
    example: 'We are open Monday to Sunday from 10:00 AM to 10:00 PM.',
    maxLength: 2000
  })
  @Column({ type: 'text', nullable: false })
  answer: string;

  @ApiProperty({
    description: 'Display order for the FAQ item (lower numbers appear first)',
    example: 1,
    minimum: 0,
    default: 0
  })
  @Column({ nullable: false, default: 0 })
  order: number;

  @ApiProperty({
    description: 'Whether the FAQ item is active and visible to users',
    example: true,
    default: true
  })
  @Column({ nullable: false, default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Date and time when the FAQ item was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the FAQ item was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
