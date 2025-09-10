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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new order',
    description: 'Place a new order for food items with customer details and payment information'
  })
  @ApiBody({ 
    type: CreateOrderDto,
    description: 'Order details including customer information and items',
    examples: {
      dineIn: {
        summary: 'Dine-in Order',
        description: 'Example of a dine-in order',
        value: {
          customerName: 'John Doe',
          customerPhone: '+1234567890',
          customerEmail: 'john.doe@example.com',
          orderType: 'dine_in',
          items: [
            {
              menuItemId: 1,
              name: 'Classic Burger',
              price: 12.99,
              quantity: 2,
              specialInstructions: 'No pickles'
            }
          ],
          subtotal: 25.98,
          tax: 2.60,
          total: 28.58,
          specialInstructions: 'Table 5'
        }
      },
      delivery: {
        summary: 'Delivery Order',
        description: 'Example of a delivery order',
        value: {
          customerName: 'Jane Smith',
          customerPhone: '+1987654321',
          customerEmail: 'jane.smith@example.com',
          orderType: 'delivery',
          items: [
            {
              menuItemId: 2,
              name: 'Chicken Burger',
              price: 14.99,
              quantity: 1
            }
          ],
          subtotal: 14.99,
          deliveryFee: 3.99,
          tax: 1.90,
          total: 20.88,
          deliveryAddress: '123 Main St, City, State 12345'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Order created successfully',
    type: Order
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
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all orders',
    description: 'Retrieve all orders with optional filtering by status or order type'
  })
  @ApiQuery({
    name: 'status',
    required: false,
    description: 'Filter orders by status',
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    example: 'pending'
  })
  @ApiQuery({
    name: 'orderType',
    required: false,
    description: 'Filter orders by type',
    enum: ['dine_in', 'takeaway', 'delivery'],
    example: 'delivery'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Orders retrieved successfully',
    type: [Order]
  })
  findAll(@Query('status') status?: string, @Query('orderType') orderType?: string) {
    if (status) {
      return this.ordersService.findByStatus(status);
    }
    if (orderType) {
      return this.ordersService.findByOrderType(orderType);
    }
    return this.ordersService.findAll();
  }

  @Get('order-number/:orderNumber')
  @ApiOperation({ 
    summary: 'Get order by order number',
    description: 'Retrieve a specific order using its unique order number'
  })
  @ApiParam({
    name: 'orderNumber',
    description: 'Unique order number',
    example: 'ORD-2024-001',
    type: 'string'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Order found and returned successfully',
    type: Order
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Order not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Order not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findByOrderNumber(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.findByOrderNumber(orderNumber);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get order by ID',
    description: 'Retrieve a specific order using its database ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Order found and returned successfully',
    type: Order
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Order not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Order not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update an order',
    description: 'Update an existing order with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateOrderDto,
    description: 'Updated order details (only provided fields will be updated)',
    examples: {
      updateStatus: {
        summary: 'Update Order Status',
        description: 'Example of updating order status',
        value: {
          status: 'confirmed'
        }
      },
      updateCustomerInfo: {
        summary: 'Update Customer Information',
        description: 'Example of updating customer details',
        value: {
          customerName: 'John Smith',
          customerPhone: '+1234567890'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Order updated successfully',
    type: Order
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Order not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Order not found' },
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
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Patch(':id/status')
  @ApiOperation({ 
    summary: 'Update order status',
    description: 'Update only the status of an existing order'
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID to update status',
    type: 'integer',
    example: 1
  })
  @ApiBody({
    description: 'New status for the order',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
          example: 'confirmed'
        }
      },
      required: ['status']
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Order status updated successfully',
    type: Order
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Order not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Order not found' },
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
    return this.ordersService.updateStatus(+id, status);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete an order',
    description: 'Remove an order from the system permanently'
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Order deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Order deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Order not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Order not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
