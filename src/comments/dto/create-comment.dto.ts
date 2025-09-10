import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Content of the comment or review',
    example: 'The food was absolutely delicious! Great service and atmosphere. Will definitely come back again.',
    maxLength: 1000
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Rating given by the customer (1-5 stars)',
    example: 5,
    minimum: 1,
    maximum: 5
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: 'Name of the person who wrote the comment',
    example: 'John Doe',
    maxLength: 100
  })
  @IsNotEmpty()
  @IsString()
  authorName: string;

  @ApiProperty({
    description: 'Job title or profession of the comment author',
    example: 'Software Engineer',
    required: false,
    maxLength: 100
  })
  @IsOptional()
  @IsString()
  authorJob?: string;

  @ApiProperty({
    description: 'URL or path to the author\'s profile image',
    example: 'https://example.com/images/john-doe.jpg',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString()
  authorImage?: string;
}
