import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('team_members')
export class TeamMember {
  @ApiProperty({
    description: 'Unique identifier for the team member',
    example: 1,
    type: 'integer'
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Full name of the team member',
    example: 'John Smith',
    maxLength: 100
  })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({
    description: 'Job position or role of the team member',
    example: 'Head Chef',
    maxLength: 100
  })
  @Column({ nullable: false })
  position: string;

  @ApiProperty({
    description: 'Years of experience in the field',
    example: 5,
    minimum: 0,
    maximum: 50
  })
  @Column({ nullable: false })
  experience: number; // years

  @ApiProperty({
    description: 'Skills and expertise of the team member',
    example: 'Culinary Arts, Food Safety, Team Management, Menu Development',
    maxLength: 500,
    required: false
  })
  @Column({ type: 'text', nullable: true })
  skills: string;

  @ApiProperty({
    description: 'URL or path to the team member\'s profile image',
    example: 'https://example.com/images/john-smith.jpg',
    maxLength: 500,
    required: false
  })
  @Column({ nullable: true })
  image: string;

  @ApiProperty({
    description: 'Date and time when the team member was added',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  createdAt: Date;

  @ApiProperty({
    description: 'Date and time when the team member information was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time'
  })
  @Column({ nullable: false, default: new Date() })
  updatedAt: Date;
}
