import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiParam, 
  ApiBody,
  ApiQuery 
} from '@nestjs/swagger';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { ContactUs } from './entities/contact-us.entity';

@ApiTags('Contact Us')
@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Submit a contact inquiry',
    description: 'Submit a new contact inquiry or complaint to the restaurant'
  })
  @ApiBody({ 
    type: CreateContactUsDto,
    description: 'Contact inquiry details',
    examples: {
      complaint: {
        summary: 'Service Complaint',
        description: 'Example of a service complaint',
        value: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '+1234567890',
          subject: 'Complaint about service',
          message: 'I would like to report an issue with my recent order. The food was cold when it arrived.'
        }
      },
      inquiry: {
        summary: 'General Inquiry',
        description: 'Example of a general inquiry',
        value: {
          fullName: 'Jane Smith',
          email: 'jane.smith@example.com',
          phoneNumber: '+1987654321',
          subject: 'Question about menu',
          message: 'Do you have any vegetarian options available?'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Contact inquiry submitted successfully',
    type: ContactUs
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
  create(@Body() createContactUsDto: CreateContactUsDto) {
    return this.contactUsService.create(createContactUsDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all contact inquiries',
    description: 'Retrieve all contact inquiries with optional filtering by status'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter inquiries by status',
    enum: ['pending', 'in_progress', 'resolved', 'closed'],
    example: 'pending'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contact inquiries retrieved successfully',
    type: [ContactUs]
  })
  findAll(@Query('status') status?: string) {
    if (status) {
      return this.contactUsService.findByStatus(status);
    }
    return this.contactUsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get contact inquiry by ID',
    description: 'Retrieve a specific contact inquiry by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Contact inquiry ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contact inquiry found and returned successfully',
    type: ContactUs
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contact inquiry not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Contact inquiry not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.contactUsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update contact inquiry',
    description: 'Update an existing contact inquiry with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Contact inquiry ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateContactUsDto,
    description: 'Updated contact inquiry details (only provided fields will be updated)',
    examples: {
      updateStatus: {
        summary: 'Update Status',
        description: 'Example of updating inquiry status',
        value: {
          status: 'in_progress'
        }
      },
      updateMessage: {
        summary: 'Update Message',
        description: 'Example of updating inquiry message',
        value: {
          message: 'Updated message with additional information'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contact inquiry updated successfully',
    type: ContactUs
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contact inquiry not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Contact inquiry not found' },
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
  update(@Param('id') id: string, @Body() updateContactUsDto: UpdateContactUsDto) {
    return this.contactUsService.update(+id, updateContactUsDto);
  }

  @Patch(':id/status')
  @ApiOperation({ 
    summary: 'Update inquiry status',
    description: 'Update only the status of a contact inquiry'
  })
  @ApiParam({
    name: 'id',
    description: 'Contact inquiry ID to update status',
    type: 'integer',
    example: 1
  })
  @ApiBody({
    description: 'New status for the inquiry',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['pending', 'in_progress', 'resolved', 'closed'],
          example: 'in_progress'
        }
      },
      required: ['status']
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Inquiry status updated successfully',
    type: ContactUs
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contact inquiry not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Contact inquiry not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid status value',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid status value' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.contactUsService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete contact inquiry',
    description: 'Remove a contact inquiry from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Contact inquiry ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Contact inquiry deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Contact inquiry deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Contact inquiry not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Contact inquiry not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.contactUsService.remove(+id);
  }
}
