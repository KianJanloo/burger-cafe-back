import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('reservations')
export class Reservation {
  @ApiProperty({
    description: 'Unique identifier for the reservation',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Full name of the person who made the reservation',
    example: 'John Doe',
    maxLength: 100
  })
  @Column({ nullable: false })
  fullName: string;

  @ApiProperty({
    description: 'Phone number for contact',
    example: '+1234567890',
    maxLength: 20
  })
  @Column({ nullable: false })
  phoneNumber: string;

  @ApiProperty({
    description: 'Email address for confirmation',
    example: 'john.doe@example.com',
    maxLength: 100,
    required: false
  })
  @Column({ nullable: true })
  email: string;

  @ApiProperty({
    description: 'Date of the reservation',
    example: '2024-01-15',
    type: 'string',
    format: 'date'
  })
  @Column({ type: 'date', nullable: false })
  date: Date;

  @ApiProperty({
    description: 'Time of the reservation',
    example: '19:30',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
  })
  @Column({ type: 'time', nullable: false })
  time: string;

  @ApiProperty({
    description: 'Number of people for the reservation',
    example: 4,
    minimum: 1,
    maximum: 20
  })
  @Column({ nullable: false })
  customerCount: number;

  @ApiProperty({
    description: 'Special requests or dietary requirements',
    example: 'Table near the window, vegetarian options needed',
    maxLength: 500,
    required: false
  })
  @Column({ type: 'text', nullable: true })
  specialRequest: string;

  @ApiProperty({
    description: 'Current status of the reservation',
    example: 'pending',
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  })
  @Column({ 
    type: 'enum', 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  })
  status: string;

  @ApiProperty({
    description: 'Date and time when the reservation was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the reservation was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
