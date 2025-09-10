import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cafe_details')
export class CafeDetails {
  @ApiProperty({
    description: 'Unique identifier for the cafe details',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Number of different burger types offered',
    example: 15,
    minimum: 1,
    maximum: 100
  })
  @Column({ nullable: false })
  kindOfBurgers: number;

  @ApiProperty({
    description: 'Years of experience in the restaurant business',
    example: 5,
    minimum: 0,
    maximum: 100
  })
  @Column({ nullable: false })
  experience: number; // years

  @ApiProperty({
    description: 'Average customer rating (0.00 to 5.00)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    type: 'number',
    format: 'decimal'
  })
  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  rate: number;

  @ApiProperty({
    description: 'Total number of customers served',
    example: 10000,
    minimum: 0
  })
  @Column({ nullable: false })
  customers: number;

  @ApiProperty({
    description: 'Date and time when the cafe details were created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the cafe details were last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
