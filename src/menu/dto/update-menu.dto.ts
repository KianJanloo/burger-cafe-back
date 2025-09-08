import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsBoolean()
  @IsNotEmpty()
  isAvailable: boolean;

  @IsNumber()
  @IsNotEmpty()
  rating: number;
}
