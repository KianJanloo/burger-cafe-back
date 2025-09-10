import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutUsDto {
  @ApiProperty({
    description: 'The story content for the About Us section',
    example: 'Founded in 2020, Burger Cafe started as a small family business with a passion for creating the most delicious burgers in town. Our journey began when we realized that great food brings people together, and we wanted to share that joy with our community.',
    maxLength: 2000
  })
  @IsString()
  @IsNotEmpty()
  story: string;
}
