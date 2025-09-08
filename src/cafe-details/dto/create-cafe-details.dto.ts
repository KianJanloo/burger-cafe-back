import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreateCafeDetailsDto {
  @IsNumber()
  @IsNotEmpty()
  kindOfBurgers: number;

  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsNumber()
  @IsNotEmpty()
  customers: number;
}
