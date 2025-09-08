import { IsNotEmpty, IsString, IsEmail, IsEnum, IsArray, IsNumber, IsOptional, IsDecimal } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  customerPhone: string;

  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @IsEnum(['dine_in', 'takeaway', 'delivery'])
  @IsNotEmpty()
  orderType: string;

  @IsArray()
  @IsNotEmpty()
  items: any[];

  @IsNumber()
  @IsNotEmpty()
  subtotal: number;

  @IsNumber()
  @IsOptional()
  deliveryFee?: number;

  @IsNumber()
  @IsOptional()
  tax?: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @IsString()
  @IsOptional()
  deliveryAddress?: string;
}
