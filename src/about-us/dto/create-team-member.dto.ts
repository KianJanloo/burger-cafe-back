import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @IsString()
  @IsOptional()
  skills?: string;

  @IsString()
  @IsOptional()
  image?: string;
}
