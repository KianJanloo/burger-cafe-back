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
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './entities/faq.entity';

@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new FAQ item',
    description: 'Add a new frequently asked question and answer to the system'
  })
  @ApiBody({ 
    type: CreateFaqDto,
    description: 'FAQ item details',
    examples: {
      openingHours: {
        summary: 'Opening Hours FAQ',
        description: 'Example of creating an opening hours FAQ',
        value: {
          question: 'What are your opening hours?',
          answer: 'We are open Monday to Sunday from 10:00 AM to 10:00 PM.',
          order: 1,
          isActive: true
        }
      },
      deliveryInfo: {
        summary: 'Delivery Information FAQ',
        description: 'Example of creating a delivery FAQ',
        value: {
          question: 'Do you offer delivery services?',
          answer: 'Yes, we offer delivery within a 5-mile radius. Delivery fee is $3.99 and takes 30-45 minutes.',
          order: 2,
          isActive: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'FAQ item created successfully',
    type: Faq
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
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all active FAQ items',
    description: 'Retrieve all active FAQ items for public display (ordered by display order)'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Active FAQ items retrieved successfully',
    type: [Faq]
  })
  findAll() {
    return this.faqService.findAll();
  }

  @Get('admin')
  @ApiOperation({ 
    summary: 'Get all FAQ items (admin)',
    description: 'Retrieve all FAQ items including inactive ones for admin management'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'All FAQ items retrieved successfully',
    type: [Faq]
  })
  findAllAdmin() {
    return this.faqService.findAllAdmin();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get FAQ item by ID',
    description: 'Retrieve a specific FAQ item by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'FAQ item ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'FAQ item found and returned successfully',
    type: Faq
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'FAQ item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'FAQ item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.faqService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update FAQ item',
    description: 'Update an existing FAQ item with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'FAQ item ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateFaqDto,
    description: 'Updated FAQ item details (only provided fields will be updated)',
    examples: {
      updateAnswer: {
        summary: 'Update Answer',
        description: 'Example of updating FAQ answer',
        value: {
          answer: 'Updated answer with more detailed information.'
        }
      },
      updateOrder: {
        summary: 'Update Display Order',
        description: 'Example of updating display order',
        value: {
          order: 3
        }
      },
      toggleActive: {
        summary: 'Toggle Active Status',
        description: 'Example of toggling active status',
        value: {
          isActive: false
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'FAQ item updated successfully',
    type: Faq
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'FAQ item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'FAQ item not found' },
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
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete FAQ item',
    description: 'Remove an FAQ item from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'FAQ item ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'FAQ item deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'FAQ item deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'FAQ item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'FAQ item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.faqService.remove(+id);
  }
}
