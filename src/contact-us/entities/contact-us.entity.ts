import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contact_us')
export class ContactUs {
  @ApiProperty({
    description: 'Unique identifier for the contact inquiry',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Full name of the person who contacted',
    example: 'John Doe',
    maxLength: 100
  })
  @Column({ nullable: false })
  fullName: string;

  @ApiProperty({
    description: 'Email address for contact',
    example: 'john.doe@example.com',
    maxLength: 100
  })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({
    description: 'Phone number for contact',
    example: '+1234567890',
    maxLength: 20
  })
  @Column({ nullable: false })
  phoneNumber: string;

  @ApiProperty({
    description: 'Subject of the inquiry',
    example: 'Complaint about service',
    maxLength: 200
  })
  @Column({ nullable: false })
  subject: string;

  @ApiProperty({
    description: 'Detailed message or inquiry',
    example: 'I would like to report an issue with my recent order. The food was cold when it arrived.',
    maxLength: 1000
  })
  @Column({ type: 'text', nullable: false })
  message: string;

  @ApiProperty({
    description: 'Current status of the inquiry',
    example: 'pending',
    enum: ['pending', 'in_progress', 'resolved', 'closed'],
    default: 'pending'
  })
  @Column({ 
    type: 'enum', 
    enum: ['pending', 'in_progress', 'resolved', 'closed'], 
    default: 'pending' 
  })
  status: string;

  @ApiProperty({
    description: 'Date and time when the inquiry was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the inquiry was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
