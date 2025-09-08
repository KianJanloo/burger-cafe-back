import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateGalleryCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
