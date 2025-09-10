import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('footer')
export class Footer {
  @ApiProperty({
    description: 'Unique identifier for the footer information',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Restaurant phone number for contact',
    example: '+1 (555) 123-4567',
    maxLength: 20
  })
  @Column({ nullable: false })
  phoneNumber: string;

  @ApiProperty({
    description: 'Restaurant email address for contact',
    example: 'info@burgercafe.com',
    maxLength: 100
  })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({
    description: 'Restaurant physical address',
    example: '123 Main Street, City, State 12345',
    maxLength: 200
  })
  @Column({ nullable: false })
  address: string;

  @ApiProperty({
    description: 'Restaurant working hours',
    example: 'Monday - Sunday: 10:00 AM - 10:00 PM',
    maxLength: 100
  })
  @Column({ nullable: false })
  workTime: string;

  @ApiProperty({
    description: 'Current location or area served',
    example: 'Downtown Area',
    maxLength: 100
  })
  @Column({ nullable: false })
  currentLocation: string;

  @ApiProperty({
    description: 'Instagram profile URL',
    example: 'https://instagram.com/burgercafe',
    maxLength: 200,
    required: false
  })
  @Column({ nullable: true })
  instagram: string;

  @ApiProperty({
    description: 'Facebook page URL',
    example: 'https://facebook.com/burgercafe',
    maxLength: 200,
    required: false
  })
  @Column({ nullable: true })
  facebook: string;

  @ApiProperty({
    description: 'Twitter profile URL',
    example: 'https://twitter.com/burgercafe',
    maxLength: 200,
    required: false
  })
  @Column({ nullable: true })
  twitter: string;

  @ApiProperty({
    description: 'Date and time when the footer information was created',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the footer information was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
