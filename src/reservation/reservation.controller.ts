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
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@ApiTags('Reservations')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new reservation',
    description: 'Make a new table reservation for the restaurant'
  })
  @ApiBody({ 
    type: CreateReservationDto,
    description: 'Reservation details including customer information and preferences',
    examples: {
      dinner: {
        summary: 'Dinner Reservation',
        description: 'Example of a dinner reservation',
        value: {
          fullName: 'John Doe',
          phoneNumber: '+1234567890',
          email: 'john.doe@example.com',
          date: '2024-01-15',
          time: '19:30',
          customerCount: 4,
          specialRequest: 'Table near the window, vegetarian options needed'
        }
      },
      lunch: {
        summary: 'Lunch Reservation',
        description: 'Example of a lunch reservation',
        value: {
          fullName: 'Jane Smith',
          phoneNumber: '+1987654321',
          email: 'jane.smith@example.com',
          date: '2024-01-16',
          time: '12:00',
          customerCount: 2,
          specialRequest: 'Quiet table for business meeting'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Reservation created successfully',
    type: Reservation
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
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all reservations',
    description: 'Retrieve all reservations with optional filtering by date'
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'Filter reservations by specific date (YYYY-MM-DD format)',
    example: '2024-01-15',
    type: 'string',
    format: 'date'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Reservations retrieved successfully',
    type: [Reservation]
  })
  findAll(@Query('date') date?: string) {
    if (date) {
      return this.reservationService.findByDate(date);
    }
    return this.reservationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get reservation by ID',
    description: 'Retrieve a specific reservation by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Reservation ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Reservation found and returned successfully',
    type: Reservation
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Reservation not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Reservation not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update reservation',
    description: 'Update an existing reservation with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Reservation ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateReservationDto,
    description: 'Updated reservation details (only provided fields will be updated)',
    examples: {
      updateTime: {
        summary: 'Update Time',
        description: 'Example of updating reservation time',
        value: {
          time: '20:00'
        }
      },
      updateCount: {
        summary: 'Update Customer Count',
        description: 'Example of updating number of people',
        value: {
          customerCount: 6
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Reservation updated successfully',
    type: Reservation
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Reservation not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Reservation not found' },
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
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Patch(':id/status')
  @ApiOperation({ 
    summary: 'Update reservation status',
    description: 'Update only the status of an existing reservation'
  })
  @ApiParam({
    name: 'id',
    description: 'Reservation ID to update status',
    type: 'integer',
    example: 1
  })
  @ApiBody({
    description: 'New status for the reservation',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['pending', 'confirmed', 'cancelled', 'completed'],
          example: 'confirmed'
        }
      },
      required: ['status']
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Reservation status updated successfully',
    type: Reservation
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Reservation not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Reservation not found' },
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
    return this.reservationService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Cancel reservation',
    description: 'Cancel and remove a reservation from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Reservation ID to cancel',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Reservation cancelled successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Reservation cancelled successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Reservation not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Reservation not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
