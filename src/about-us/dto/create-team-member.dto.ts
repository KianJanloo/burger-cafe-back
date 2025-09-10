import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({
    description: 'Full name of the team member',
    example: 'John Smith',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Job position or role of the team member',
    example: 'Head Chef',
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({
    description: 'Years of experience in the field',
    example: 5,
    minimum: 0,
    maximum: 50
  })
  @IsNumber()
  @IsNotEmpty()
  experience: number;

  @ApiProperty({
    description: 'Skills and expertise of the team member',
    example: 'Culinary Arts, Food Safety, Team Management, Menu Development',
    required: false,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  skills?: string;

  @ApiProperty({
    description: 'URL or path to the team member\'s profile image',
    example: 'https://example.com/images/john-smith.jpg',
    required: false,
    maxLength: 500
  })
  @IsString()
  @IsOptional()
  image?: string;
}
