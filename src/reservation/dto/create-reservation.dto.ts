import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsNumber()
  @IsNotEmpty()
  customerCount: number;

  @IsString()
  @IsOptional()
  specialRequest?: string;
}
