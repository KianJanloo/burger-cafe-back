import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsOptional()
  @IsString()
  authorJob?: string;

  @IsOptional()
  @IsString()
  authorImage?: string;
}
