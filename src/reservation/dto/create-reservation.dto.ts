import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Full name of the person making the reservation',
    example: 'John Doe',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Phone number for contact',
    example: '+1234567890',
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Email address for confirmation',
    example: 'john.doe@example.com',
    required: false,
    maxLength: 100
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Date of the reservation',
    example: '2024-01-15',
    type: 'string',
    format: 'date'
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'Time of the reservation',
    example: '19:30',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
  })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({
    description: 'Number of people for the reservation',
    example: 4,
    minimum: 1,
    maximum: 20
  })
  @IsNumber()
  @IsNotEmpty()
  customerCount: number;

  @ApiProperty({
    description: 'Special requests or dietary requirements',
    example: 'Table near the window, vegetarian options needed',
    required: false,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  specialRequest?: string;
}
