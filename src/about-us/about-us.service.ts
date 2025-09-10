import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUs } from './entities/about-us.entity';
import { TeamMember } from './entities/team-member.entity';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(AboutUs)
    private aboutUsRepository: Repository<AboutUs>,
    @InjectRepository(TeamMember)
    private teamMemberRepository: Repository<TeamMember>,
  ) {}

  // About Us Story methods
  async createStory(createAboutUsDto: CreateAboutUsDto): Promise<AboutUs> {
    const aboutUs = this.aboutUsRepository.create(createAboutUsDto);
    return this.aboutUsRepository.save(aboutUs);
  }

  async getStory(): Promise<AboutUs[]> {
    return this.aboutUsRepository.find();
  }

  async updateStory(
    id: number,
    updateAboutUsDto: UpdateAboutUsDto,
  ): Promise<AboutUs> {
    await this.aboutUsRepository.update(id, updateAboutUsDto);
    const aboutUs = await this.aboutUsRepository.findOne({ where: { id } });
    if (!aboutUs) {
      throw new NotFoundException('About us story not found');
    }
    return aboutUs;
  }

  async removeStory(id: number): Promise<{ message: string }> {
    const story = await this.aboutUsRepository.findOne({ where: { id } });
    if (!story) {
      throw new NotFoundException('Story not found');
    }
    await this.aboutUsRepository.delete(id);
    return {
      message: 'Story deleted successfully',
    };
  }

  // Team Member methods
  async createTeamMember(
    createTeamMemberDto: CreateTeamMemberDto,
  ): Promise<TeamMember> {
    const teamMember = this.teamMemberRepository.create(createTeamMemberDto);
    return this.teamMemberRepository.save(teamMember);
  }

  async findAllTeamMembers(): Promise<TeamMember[]> {
    return this.teamMemberRepository.find();
  }

  async findOneTeamMember(id: number): Promise<TeamMember> {
    const teamMember = await this.teamMemberRepository.findOne({
      where: { id },
    });
    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }
    return teamMember;
  }

  async updateTeamMember(
    id: number,
    updateTeamMemberDto: UpdateTeamMemberDto,
  ): Promise<TeamMember> {
    await this.teamMemberRepository.update(id, updateTeamMemberDto);
    const teamMember = await this.teamMemberRepository.findOne({
      where: { id },
    });
    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }
    return teamMember;
  }

  async removeTeamMember(id: number): Promise<{ message: string }> {
    const teamMember = await this.findOneTeamMember(id);
    if (!teamMember) {
      throw new NotFoundException('Team member not found');
    }
    await this.teamMemberRepository.delete(id);
    return {
      message: 'Team member deleted successfully',
    };
  }
}
