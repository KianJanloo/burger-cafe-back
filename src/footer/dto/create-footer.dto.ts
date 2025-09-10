import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFooterDto {
  @ApiProperty({
    description: 'Restaurant phone number for contact',
    example: '+1 (555) 123-4567',
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Restaurant email address for contact',
    example: 'info@burgercafe.com',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Restaurant physical address',
    example: '123 Main Street, City, State 12345',
    maxLength: 200
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Restaurant working hours',
    example: 'Monday - Sunday: 10:00 AM - 10:00 PM',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  workTime: string;

  @ApiProperty({
    description: 'Current location or area served',
    example: 'Downtown Area',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  currentLocation: string;

  @ApiProperty({
    description: 'Instagram profile URL',
    example: 'https://instagram.com/burgercafe',
    required: false,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiProperty({
    description: 'Facebook page URL',
    example: 'https://facebook.com/burgercafe',
    required: false,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    description: 'Twitter profile URL',
    example: 'https://twitter.com/burgercafe',
    required: false,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  twitter?: string;
}
