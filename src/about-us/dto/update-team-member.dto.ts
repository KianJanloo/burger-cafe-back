import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateTeamMemberDto } from './create-team-member.dto';

export class UpdateTeamMemberDto extends PartialType(CreateTeamMemberDto) {
  @ApiProperty({
    description: 'ID of the team member to update',
    example: 1,
    required: false
  })
  id?: number;
}
