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
import { GalleryService } from './gallery.service';
import { CreateGalleryCategoryDto } from './dto/create-gallery-category.dto';
import { UpdateGalleryCategoryDto } from './dto/update-gallery-category.dto';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from './dto/update-gallery-item.dto';
import { GalleryCategory } from './entities/gallery-category.entity';
import { GalleryItem } from './entities/gallery-item.entity';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  // Gallery Category endpoints
  @Post('categories')
  @ApiOperation({ 
    summary: 'Create a new gallery category',
    description: 'Add a new category for organizing gallery items'
  })
  @ApiBody({ 
    type: CreateGalleryCategoryDto,
    description: 'Gallery category details',
    examples: {
      foodGallery: {
        summary: 'Food Gallery Category',
        description: 'Example of creating a food gallery category',
        value: {
          name: 'Food Gallery',
          description: 'Collection of our delicious food items'
        }
      },
      restaurantInterior: {
        summary: 'Restaurant Interior Category',
        description: 'Example of creating an interior gallery category',
        value: {
          name: 'Restaurant Interior',
          description: 'Photos of our beautiful restaurant interior'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Gallery category created successfully',
    type: GalleryCategory
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
  createCategory(@Body() createGalleryCategoryDto: CreateGalleryCategoryDto) {
    return this.galleryService.createCategory(createGalleryCategoryDto);
  }

  @Get('categories')
  @ApiOperation({ 
    summary: 'Get all gallery categories',
    description: 'Retrieve all gallery categories'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery categories retrieved successfully',
    type: [GalleryCategory]
  })
  findAllCategories() {
    return this.galleryService.findAllCategories();
  }

  @Get('categories/:id')
  @ApiOperation({ 
    summary: 'Get gallery category by ID',
    description: 'Retrieve a specific gallery category by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Gallery category ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery category found and returned successfully',
    type: GalleryCategory
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery category not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery category not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOneCategory(@Param('id') id: string) {
    return this.galleryService.findOneCategory(+id);
  }

  @Patch('categories/:id')
  @ApiOperation({ 
    summary: 'Update gallery category',
    description: 'Update an existing gallery category with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Gallery category ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateGalleryCategoryDto,
    description: 'Updated gallery category details (only provided fields will be updated)',
    examples: {
      updateName: {
        summary: 'Update Name',
        description: 'Example of updating category name',
        value: {
          name: 'Updated Food Gallery'
        }
      },
      updateDescription: {
        summary: 'Update Description',
        description: 'Example of updating category description',
        value: {
          description: 'Updated description with more details'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery category updated successfully',
    type: GalleryCategory
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery category not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery category not found' },
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
  updateCategory(@Param('id') id: string, @Body() updateGalleryCategoryDto: UpdateGalleryCategoryDto) {
    return this.galleryService.updateCategory(+id, updateGalleryCategoryDto);
  }

  @Delete('categories/:id')
  @ApiOperation({ 
    summary: 'Delete gallery category',
    description: 'Remove a gallery category from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Gallery category ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery category deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Gallery category deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery category not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery category not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  removeCategory(@Param('id') id: string) {
    return this.galleryService.removeCategory(+id);
  }

  // Gallery Item endpoints
  @Post('items')
  @ApiOperation({ 
    summary: 'Create a new gallery item',
    description: 'Add a new item to the gallery'
  })
  @ApiBody({ 
    type: CreateGalleryItemDto,
    description: 'Gallery item details',
    examples: {
      foodItem: {
        summary: 'Food Gallery Item',
        description: 'Example of creating a food gallery item',
        value: {
          title: 'Classic Burger',
          description: 'Our signature burger with fresh ingredients',
          image: 'https://example.com/images/burger.jpg',
          categoryId: 1
        }
      },
      interiorItem: {
        summary: 'Interior Gallery Item',
        description: 'Example of creating an interior gallery item',
        value: {
          title: 'Main Dining Area',
          description: 'Beautiful main dining area with modern decor',
          image: 'https://example.com/images/dining-area.jpg',
          categoryId: 2
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Gallery item created successfully',
    type: GalleryItem
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
  createItem(@Body() createGalleryItemDto: CreateGalleryItemDto) {
    return this.galleryService.createItem(createGalleryItemDto);
  }

  @Get('items')
  @ApiOperation({ 
    summary: 'Get all gallery items',
    description: 'Retrieve all gallery items'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery items retrieved successfully',
    type: [GalleryItem]
  })
  findAllItems() {
    return this.galleryService.findAllItems();
  }

  @Get('items/category/:categoryId')
  @ApiOperation({ 
    summary: 'Get gallery items by category',
    description: 'Retrieve all gallery items belonging to a specific category'
  })
  @ApiParam({
    name: 'categoryId',
    description: 'Gallery category ID to filter items by',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery items retrieved successfully',
    type: [GalleryItem]
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery category not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery category not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findItemsByCategory(@Param('categoryId') categoryId: string) {
    return this.galleryService.findItemsByCategory(+categoryId);
  }

  @Get('items/:id')
  @ApiOperation({ 
    summary: 'Get gallery item by ID',
    description: 'Retrieve a specific gallery item by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Gallery item ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery item found and returned successfully',
    type: GalleryItem
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  findOneItem(@Param('id') id: string) {
    return this.galleryService.findOneItem(+id);
  }

  @Patch('items/:id')
  @ApiOperation({ 
    summary: 'Update gallery item',
    description: 'Update an existing gallery item with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Gallery item ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateGalleryItemDto,
    description: 'Updated gallery item details (only provided fields will be updated)',
    examples: {
      updateTitle: {
        summary: 'Update Title',
        description: 'Example of updating item title',
        value: {
          title: 'Updated Classic Burger'
        }
      },
      updateImage: {
        summary: 'Update Image',
        description: 'Example of updating item image',
        value: {
          image: 'https://example.com/images/new-burger.jpg'
        }
      },
      changeCategory: {
        summary: 'Change Category',
        description: 'Example of changing item category',
        value: {
          categoryId: 2
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery item updated successfully',
    type: GalleryItem
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery item not found' },
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
  updateItem(@Param('id') id: string, @Body() updateGalleryItemDto: UpdateGalleryItemDto) {
    return this.galleryService.updateItem(+id, updateGalleryItemDto);
  }

  @Delete('items/:id')
  @ApiOperation({ 
    summary: 'Delete gallery item',
    description: 'Remove a gallery item from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Gallery item ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Gallery item deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Gallery item deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Gallery item not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Gallery item not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  removeItem(@Param('id') id: string) {
    return this.galleryService.removeItem(+id);
  }
}
