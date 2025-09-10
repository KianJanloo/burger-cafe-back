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
import { FooterService } from './footer.service';
import { CreateFooterDto } from './dto/create-footer.dto';
import { UpdateFooterDto } from './dto/update-footer.dto';
import { Footer } from './entities/footer.entity';

@ApiTags('Footer')
@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create footer information',
    description: 'Add new footer information including contact details and social media links'
  })
  @ApiBody({ 
    type: CreateFooterDto,
    description: 'Footer information details',
    examples: {
      completeFooter: {
        summary: 'Complete Footer Information',
        description: 'Example of creating complete footer information',
        value: {
          phoneNumber: '+1 (555) 123-4567',
          email: 'info@burgercafe.com',
          address: '123 Main Street, City, State 12345',
          workTime: 'Monday - Sunday: 10:00 AM - 10:00 PM',
          currentLocation: 'Downtown Area',
          instagram: 'https://instagram.com/burgercafe',
          facebook: 'https://facebook.com/burgercafe',
          twitter: 'https://twitter.com/burgercafe'
        }
      },
      minimalFooter: {
        summary: 'Minimal Footer Information',
        description: 'Example of creating minimal footer information',
        value: {
          phoneNumber: '+1 (555) 123-4567',
          email: 'info@burgercafe.com',
          address: '123 Main Street, City, State 12345',
          workTime: 'Monday - Sunday: 10:00 AM - 10:00 PM',
          currentLocation: 'Downtown Area'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Footer information created successfully',
    type: Footer
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
  create(@Body() createFooterDto: CreateFooterDto) {
    return this.footerService.create(createFooterDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all footer information',
    description: 'Retrieve all footer information entries'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Footer information retrieved successfully',
    type: [Footer]
  })
  findAll() {
    return this.footerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get footer information by ID',
    description: 'Retrieve specific footer information by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Footer information ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Footer information found and returned successfully',
    type: Footer
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Footer information not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Footer information not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.footerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update footer information',
    description: 'Update existing footer information with new details'
  })
  @ApiParam({
    name: 'id',
    description: 'Footer information ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateFooterDto,
    description: 'Updated footer information details (only provided fields will be updated)',
    examples: {
      updateContact: {
        summary: 'Update Contact Information',
        description: 'Example of updating contact details',
        value: {
          phoneNumber: '+1 (555) 987-6543',
          email: 'contact@burgercafe.com'
        }
      },
      updateSocialMedia: {
        summary: 'Update Social Media Links',
        description: 'Example of updating social media links',
        value: {
          instagram: 'https://instagram.com/newburgercafe',
          facebook: 'https://facebook.com/newburgercafe'
        }
      },
      updateHours: {
        summary: 'Update Working Hours',
        description: 'Example of updating working hours',
        value: {
          workTime: 'Monday - Friday: 9:00 AM - 11:00 PM, Saturday - Sunday: 10:00 AM - 12:00 AM'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Footer information updated successfully',
    type: Footer
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Footer information not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Footer information not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
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
  update(@Param('id') id: string, @Body() updateFooterDto: UpdateFooterDto) {
    return this.footerService.update(+id, updateFooterDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete footer information',
    description: 'Remove footer information from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Footer information ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Footer information deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Footer information deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Footer information not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Footer information not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.footerService.remove(+id);
  }
}
