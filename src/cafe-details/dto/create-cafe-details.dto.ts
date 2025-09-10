import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCafeDetailsDto {
  @ApiProperty({
    description: 'Number of different burger types offered',
    example: 15,
    minimum: 1,
    maximum: 100
  })
  @IsNumber()
  @IsNotEmpty()
  kindOfBurgers: number;

  @ApiProperty({
    description: 'Years of experience in the restaurant business',
    example: 5,
    minimum: 0,
    maximum: 100
  })
  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @ApiProperty({
    description: 'Average customer rating (0.00 to 5.00)',
    example: 4.5,
    minimum: 0,
    maximum: 5,
    type: 'number',
    format: 'decimal'
  })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    description: 'Total number of customers served',
    example: 10000,
    minimum: 0
  })
  @IsNumber()
  @IsNotEmpty()
  customers: number;
}
