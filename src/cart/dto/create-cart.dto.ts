import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsNumber()
  @IsNotEmpty()
  foodId: number;

  @IsString()
  @IsNotEmpty()
  foodName: string;

  @IsNumber()
  @IsNotEmpty()
  foodPrice: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsOptional()
  specialInstructions?: string;
}
