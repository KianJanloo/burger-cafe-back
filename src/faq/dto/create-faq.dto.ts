import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({
    description: 'The frequently asked question',
    example: 'What are your opening hours?',
    maxLength: 500
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: 'The answer to the frequently asked question',
    example: 'We are open Monday to Sunday from 10:00 AM to 10:00 PM.',
    maxLength: 2000
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    description: 'Display order for the FAQ item (lower numbers appear first)',
    example: 1,
    minimum: 0,
    required: false,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({
    description: 'Whether the FAQ item is active and visible to users',
    example: true,
    required: false,
    default: true
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
