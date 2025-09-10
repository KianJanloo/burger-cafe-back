import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('comments')
export class Comment {
  @ApiProperty({
    description: 'Unique identifier for the comment',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Content of the comment or review',
    example: 'The food was absolutely delicious! Great service and atmosphere. Will definitely come back again.',
    maxLength: 1000
  })
  @Column({ nullable: false })
  content: string;

  @ApiProperty({
    description: 'Rating given by the customer (1-5 stars)',
    example: 5,
    minimum: 1,
    maximum: 5
  })
  @Column({ nullable: false })
  rating: number;

  @ApiProperty({
    description: 'Name of the person who wrote the comment',
    example: 'John Doe',
    maxLength: 100
  })
  @Column({ nullable: false })
  authorName: string;

  @ApiProperty({
    description: 'Job title or profession of the comment author',
    example: 'Software Engineer',
    maxLength: 100,
    required: false
  })
  @Column({ nullable: true })
  authorJob: string;

  @ApiProperty({
    description: 'URL or path to the author\'s profile image',
    example: 'https://example.com/images/john-doe.jpg',
    maxLength: 500,
    required: false
  })
  @Column({ nullable: true })
  authorImage: string;

  @ApiProperty({
    description: 'Date and time when the comment was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the comment was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
