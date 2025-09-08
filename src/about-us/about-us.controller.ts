import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  // Story endpoints
  @Post('story')
  createStory(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.createStory(createAboutUsDto);
  }

  @Get('story')
  getStory() {
    return this.aboutUsService.getStory();
  }

  @Patch('story/:id')
  updateStory(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.updateStory(+id, updateAboutUsDto);
  }

  @Delete('story/:id')
  removeStory(@Param('id') id: string) {
    return this.aboutUsService.removeStory(+id);
  }

  // Team member endpoints
  @Post('team')
  createTeamMember(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.aboutUsService.createTeamMember(createTeamMemberDto);
  }

  @Get('team')
  findAllTeamMembers() {
    return this.aboutUsService.findAllTeamMembers();
  }

  @Get('team/:id')
  findOneTeamMember(@Param('id') id: string) {
    return this.aboutUsService.findOneTeamMember(+id);
  }

  @Patch('team/:id')
  updateTeamMember(@Param('id') id: string, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.aboutUsService.updateTeamMember(+id, updateTeamMemberDto);
  }

  @Delete('team/:id')
  removeTeamMember(@Param('id') id: string) {
    return this.aboutUsService.removeTeamMember(+id);
  }
}
