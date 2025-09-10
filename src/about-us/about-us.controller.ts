import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBody 
} from '@nestjs/swagger';
import { AboutUsService } from './about-us.service';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { AboutUs } from './entities/about-us.entity';
import { TeamMember } from './entities/team-member.entity';

@ApiTags('About Us')
@Controller('about-us')
export class AboutUsController {
  constructor(private readonly aboutUsService: AboutUsService) {}

  // Story endpoints
  @Post('story')
  @ApiOperation({ 
    summary: 'Create a new about us story',
    description: 'Add a new story section to the About Us page'
  })
  @ApiBody({ 
    type: CreateAboutUsDto,
    description: 'Story content for the About Us section',
    examples: {
      story: {
        summary: 'Company Story',
        description: 'Example of creating a company story',
        value: {
          story: 'Founded in 2020, Burger Cafe started as a small family business with a passion for creating the most delicious burgers in town. Our journey began when we realized that great food brings people together, and we wanted to share that joy with our community.'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'About us story created successfully',
    type: AboutUs
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  createStory(@Body() createAboutUsDto: CreateAboutUsDto) {
    return this.aboutUsService.createStory(createAboutUsDto);
  }

  @Get('story')
  @ApiOperation({ 
    summary: 'Get about us story',
    description: 'Retrieve the current about us story content'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'About us story retrieved successfully',
    type: AboutUs
  })
  getStory() {
    return this.aboutUsService.getStory();
  }

  @Patch('story/:id')
  @ApiOperation({ 
    summary: 'Update about us story',
    description: 'Update an existing about us story with new content'
  })
  @ApiParam({
    name: 'id',
    description: 'Story ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateAboutUsDto,
    description: 'Updated story content (only provided fields will be updated)',
    examples: {
      updateStory: {
        summary: 'Update Story Content',
        description: 'Example of updating story content',
        value: {
          story: 'Updated story content with new information about our company.'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'About us story updated successfully',
    type: AboutUs
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Story not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Story not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  updateStory(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutUsDto) {
    return this.aboutUsService.updateStory(+id, updateAboutUsDto);
  }

  @Delete('story/:id')
  @ApiOperation({ 
    summary: 'Delete about us story',
    description: 'Remove an about us story from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Story ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'About us story deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Story deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Story not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Story not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  removeStory(@Param('id') id: string) {
    return this.aboutUsService.removeStory(+id);
  }

  // Team member endpoints
  @Post('team')
  @ApiOperation({ 
    summary: 'Add a new team member',
    description: 'Add a new team member to the About Us page'
  })
  @ApiBody({ 
    type: CreateTeamMemberDto,
    description: 'Team member information',
    examples: {
      chef: {
        summary: 'Head Chef',
        description: 'Example of adding a head chef',
        value: {
          name: 'John Smith',
          position: 'Head Chef',
          experience: 8,
          skills: 'Culinary Arts, Food Safety, Team Management, Menu Development',
          image: 'https://example.com/images/john-smith.jpg'
        }
      },
      manager: {
        summary: 'Restaurant Manager',
        description: 'Example of adding a restaurant manager',
        value: {
          name: 'Sarah Johnson',
          position: 'Restaurant Manager',
          experience: 5,
          skills: 'Customer Service, Operations Management, Staff Training',
          image: 'https://example.com/images/sarah-johnson.jpg'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Team member added successfully',
    type: TeamMember
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid input data',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', items: { type: 'string' } },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  createTeamMember(@Body() createTeamMemberDto: CreateTeamMemberDto) {
    return this.aboutUsService.createTeamMember(createTeamMemberDto);
  }

  @Get('team')
  @ApiOperation({ 
    summary: 'Get all team members',
    description: 'Retrieve all team members from the About Us page'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Team members retrieved successfully',
    type: [TeamMember]
  })
  findAllTeamMembers() {
    return this.aboutUsService.findAllTeamMembers();
  }

  @Get('team/:id')
  @ApiOperation({ 
    summary: 'Get team member by ID',
    description: 'Retrieve a specific team member by their ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Team member ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Team member found and returned successfully',
    type: TeamMember
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Team member not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Team member not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOneTeamMember(@Param('id') id: string) {
    return this.aboutUsService.findOneTeamMember(+id);
  }

  @Patch('team/:id')
  @ApiOperation({ 
    summary: 'Update team member',
    description: 'Update an existing team member\'s information'
  })
  @ApiParam({
    name: 'id',
    description: 'Team member ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateTeamMemberDto,
    description: 'Updated team member information (only provided fields will be updated)',
    examples: {
      updatePosition: {
        summary: 'Update Position',
        description: 'Example of updating team member position',
        value: {
          position: 'Senior Head Chef'
        }
      },
      updateExperience: {
        summary: 'Update Experience',
        description: 'Example of updating years of experience',
        value: {
          experience: 10
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Team member updated successfully',
    type: TeamMember
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Team member not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Team member not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  updateTeamMember(@Param('id') id: string, @Body() updateTeamMemberDto: UpdateTeamMemberDto) {
    return this.aboutUsService.updateTeamMember(+id, updateTeamMemberDto);
  }

  @Delete('team/:id')
  @ApiOperation({ 
    summary: 'Remove team member',
    description: 'Remove a team member from the About Us page'
  })
  @ApiParam({
    name: 'id',
    description: 'Team member ID to remove',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Team member removed successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Team member removed successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Team member not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Team member not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  removeTeamMember(@Param('id') id: string) {
    return this.aboutUsService.removeTeamMember(+id);
  }
}
