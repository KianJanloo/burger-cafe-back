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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Add item to cart',
    description: 'Add a food item to the shopping cart with specified quantity'
  })
  @ApiBody({ 
    type: CreateCartDto,
    description: 'Cart item details',
    examples: {
      addBurger: {
        summary: 'Add Burger to Cart',
        description: 'Example of adding a burger to cart',
        value: {
          sessionId: 'sess_1234567890abcdef',
          foodId: 1,
          foodName: 'Classic Burger',
          foodPrice: 12.99,
          quantity: 2,
          specialInstructions: 'No pickles, extra cheese'
        }
      },
      addDrink: {
        summary: 'Add Drink to Cart',
        description: 'Example of adding a drink to cart',
        value: {
          sessionId: 'sess_1234567890abcdef',
          foodId: 5,
          foodName: 'Coca Cola',
          foodPrice: 2.99,
          quantity: 1
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Item added to cart successfully',
    type: Cart
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
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get cart items by session',
    description: 'Retrieve all items in the cart for a specific session'
  })
  @ApiQuery({
    name: 'sessionId',
    required: true,
    description: 'Session ID to get cart items for',
    example: 'sess_1234567890abcdef',
    type: 'string'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cart items retrieved successfully',
    type: [Cart]
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Session ID is required',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Session ID is required' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  findBySessionId(@Query('sessionId') sessionId: string) {
    return this.cartService.findBySessionId(sessionId);
  }

  @Get('total')
  @ApiOperation({ 
    summary: 'Get cart total',
    description: 'Calculate and return the total price of all items in the cart for a session'
  })
  @ApiQuery({
    name: 'sessionId',
    required: true,
    description: 'Session ID to calculate total for',
    example: 'sess_1234567890abcdef',
    type: 'string'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cart total calculated successfully',
    schema: {
      type: 'object',
      properties: {
        sessionId: { type: 'string', example: 'sess_1234567890abcdef' },
        total: { type: 'number', example: 25.98 },
        itemCount: { type: 'number', example: 2 }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Session ID is required',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Session ID is required' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  getCartTotal(@Query('sessionId') sessionId: string) {
    return this.cartService.getCartTotal(sessionId);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get cart item by ID',
    description: 'Retrieve a specific cart item by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Cart item ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cart item found and returned successfully',
    type: Cart
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cart item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cart item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update cart item',
    description: 'Update an existing cart item with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Cart item ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateCartDto,
    description: 'Updated cart item details (only provided fields will be updated)',
    examples: {
      updateQuantity: {
        summary: 'Update Quantity',
        description: 'Example of updating item quantity',
        value: {
          quantity: 3
        }
      },
      updateInstructions: {
        summary: 'Update Instructions',
        description: 'Example of updating special instructions',
        value: {
          specialInstructions: 'Extra sauce, no onions'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cart item updated successfully',
    type: Cart
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cart item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cart item not found' },
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
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Patch(':id/quantity')
  @ApiOperation({ 
    summary: 'Update item quantity',
    description: 'Update only the quantity of a specific cart item'
  })
  @ApiParam({
    name: 'id',
    description: 'Cart item ID to update quantity',
    type: 'integer',
    example: 1
  })
  @ApiBody({
    description: 'New quantity for the cart item',
    schema: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          example: 3,
          minimum: 1,
          maximum: 10
        }
      },
      required: ['quantity']
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Item quantity updated successfully',
    type: Cart
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cart item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cart item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: 'Invalid quantity value',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: 'Invalid quantity value' },
        error: { type: 'string', example: 'Bad Request' }
      }
    }
  })
  updateQuantity(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.cartService.updateQuantity(+id, quantity);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Remove item from cart',
    description: 'Remove a specific item from the cart'
  })
  @ApiParam({
    name: 'id',
    description: 'Cart item ID to remove',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Item removed from cart successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Item removed from cart successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Cart item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Cart item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  @Delete('session/:sessionId')
  @ApiOperation({ 
    summary: 'Clear entire cart',
    description: 'Remove all items from the cart for a specific session'
  })
  @ApiParam({
    name: 'sessionId',
    description: 'Session ID to clear cart for',
    example: 'sess_1234567890abcdef',
    type: 'string'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Cart cleared successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Cart cleared successfully' },
        sessionId: { type: 'string', example: 'sess_1234567890abcdef' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'No items found in cart for this session',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'No items found in cart for this session' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  clearSession(@Param('sessionId') sessionId: string) {
    return this.cartService.clearSession(sessionId);
  }
}
