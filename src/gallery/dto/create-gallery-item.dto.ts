import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGalleryItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
