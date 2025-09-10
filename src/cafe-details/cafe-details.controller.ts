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
import { CafeDetailsService } from './cafe-details.service';
import { CreateCafeDetailsDto } from './dto/create-cafe-details.dto';
import { UpdateCafeDetailsDto } from './dto/update-cafe-details.dto';
import { CafeDetails } from './entities/cafe-details.entity';

@ApiTags('Cafe Details')
@Controller('cafe-details')
export class CafeDetailsController {
  constructor(private readonly cafeDetailsService: CafeDetailsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create cafe statistics',
    description: 'Add new cafe statistics including burger count, experience, rating, and customer count'
  })
  @ApiBody({ 
    type: CreateCafeDetailsDto,
    description: 'Cafe statistics details',
    examples: {
      newCafe: {
        summary: 'New Cafe Statistics',
        description: 'Example of creating statistics for a new cafe',
        value: {
          kindOfBurgers: 12,
          experience: 2,
          rate: 4.2,
          customers: 1500
        }
      },
      establishedCafe: {
        summary: 'Established Cafe Statistics',
        description: 'Example of creating statistics for an established cafe',
        value: {
          kindOfBurgers: 25,
          experience: 8,
          rate: 4.8,
          customers: 50000
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Cafe statistics created successfully',
    type: CafeDetails
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
  create(@Body() createCafeDetailsDto: CreateCafeDetailsDto) {
    return this.cafeDetailsService.create(createCafeDetailsDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all cafe statistics',
    description: 'Retrieve all cafe statistics entries'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cafe statistics retrieved successfully',
    type: [CafeDetails]
  })
  findAll() {
    return this.cafeDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get cafe statistics by ID',
    description: 'Retrieve specific cafe statistics by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Cafe details ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cafe statistics found and returned successfully',
    type: CafeDetails
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cafe statistics not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cafe statistics not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.cafeDetailsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update cafe statistics',
    description: 'Update existing cafe statistics with new data'
  })
  @ApiParam({
    name: 'id',
    description: 'Cafe details ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateCafeDetailsDto,
    description: 'Updated cafe statistics details (only provided fields will be updated)',
    examples: {
      updateRating: {
        summary: 'Update Rating',
        description: 'Example of updating customer rating',
        value: {
          rate: 4.9
        }
      },
      updateCustomers: {
        summary: 'Update Customer Count',
        description: 'Example of updating customer count',
        value: {
          customers: 75000
        }
      },
      updateBurgers: {
        summary: 'Update Burger Count',
        description: 'Example of updating number of burger types',
        value: {
          kindOfBurgers: 30
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
    description: 'Cafe statistics updated successfully',
    type: CafeDetails
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cafe statistics not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cafe statistics not found' },
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
  update(@Param('id') id: string, @Body() updateCafeDetailsDto: UpdateCafeDetailsDto) {
    return this.cafeDetailsService.update(+id, updateCafeDetailsDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete cafe statistics',
    description: 'Remove cafe statistics from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Cafe details ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cafe statistics deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Cafe statistics deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cafe statistics not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cafe statistics not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.cafeDetailsService.remove(+id);
  }
}
