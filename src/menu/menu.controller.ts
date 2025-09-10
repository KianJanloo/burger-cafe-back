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
  ApiBody,
  ApiQuery 
} from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Food } from './entities/menu.entity';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new menu item',
    description: 'Add a new food item to the restaurant menu with all required details'
  })
  @ApiBody({ 
    type: CreateMenuDto,
    description: 'Menu item details',
    examples: {
      burger: {
        summary: 'Classic Burger',
        description: 'Example of creating a burger menu item',
        value: {
          name: 'Classic Burger',
          price: '$12.99',
          description: 'A delicious classic burger with fresh lettuce, tomato, and our special sauce',
          image: 'https://example.com/images/classic-burger.jpg',
          category: 'Burgers',
          duration: 15,
          rating: 4.5,
          isAvailable: true
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Menu item created successfully',
    type: Food
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
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all menu items',
    description: 'Retrieve all available menu items from the restaurant'
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter menu items by category',
    enum: ['Burgers', 'Sides', 'Drinks', 'Desserts', 'Salads'],
    example: 'Burgers'
  })
  @ApiQuery({
    name: 'available',
    required: false,
    description: 'Filter by availability status',
    type: 'boolean',
    example: true
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Menu items retrieved successfully',
    type: [Food]
  })
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a specific menu item',
    description: 'Retrieve a single menu item by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Menu item ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Menu item found and returned successfully',
    type: Food
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Menu item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Menu item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a menu item',
    description: 'Update an existing menu item with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Menu item ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateMenuDto,
    description: 'Updated menu item details (only provided fields will be updated)',
    examples: {
      updatePrice: {
        summary: 'Update Price',
        description: 'Example of updating only the price',
        value: {
          price: '$14.99'
        }
      },
      updateAvailability: {
        summary: 'Update Availability',
        description: 'Example of updating availability status',
        value: {
          isAvailable: false
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Menu item updated successfully',
    type: Food
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Menu item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Menu item not found' },
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
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a menu item',
    description: 'Remove a menu item from the restaurant menu permanently'
  })
  @ApiParam({
    name: 'id',
    description: 'Menu item ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Menu item deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Menu item deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Menu item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Menu item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
