import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactUsDto {
  @ApiProperty({
    description: 'Full name of the person contacting',
    example: 'John Doe',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Email address for contact',
    example: 'john.doe@example.com',
    maxLength: 100
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Phone number for contact',
    example: '+1234567890',
    maxLength: 20
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Subject of the inquiry',
    example: 'Complaint about service',
    maxLength: 200
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Detailed message or inquiry',
    example: 'I would like to report an issue with my recent order. The food was cold when it arrived.',
    maxLength: 1000
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
