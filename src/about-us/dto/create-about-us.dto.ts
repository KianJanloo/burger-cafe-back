import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAboutUsDto {
  @IsString()
  @IsNotEmpty()
  story: string;
}
