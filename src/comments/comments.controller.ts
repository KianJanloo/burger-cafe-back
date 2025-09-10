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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new comment',
    description: 'Add a new customer review or comment to the restaurant'
  })
  @ApiBody({ 
    type: CreateCommentDto,
    description: 'Comment details including rating and author information',
    examples: {
      positiveReview: {
        summary: 'Positive Review',
        description: 'Example of a positive customer review',
        value: {
          content: 'The food was absolutely delicious! Great service and atmosphere. Will definitely come back again.',
          rating: 5,
          authorName: 'John Doe',
          authorJob: 'Software Engineer',
          authorImage: 'https://example.com/images/john-doe.jpg'
        }
      },
      constructiveFeedback: {
        summary: 'Constructive Feedback',
        description: 'Example of constructive feedback',
        value: {
          content: 'Good food overall, but the service was a bit slow. The burger was excellent though!',
          rating: 4,
          authorName: 'Jane Smith',
          authorJob: 'Marketing Manager'
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: 'Comment created successfully',
    type: Comment
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
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all comments',
    description: 'Retrieve all customer comments and reviews'
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Comments retrieved successfully',
    type: [Comment]
  })
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get comment by ID',
    description: 'Retrieve a specific comment by its ID'
  })
  @ApiParam({
    name: 'id',
    description: 'Comment ID',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Comment found and returned successfully',
    type: Comment
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Comment not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Comment not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async findOne(@Param('id') id: string) {
    return await this.commentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update comment',
    description: 'Update an existing comment with new information'
  })
  @ApiParam({
    name: 'id',
    description: 'Comment ID to update',
    type: 'integer',
    example: 1
  })
  @ApiBody({ 
    type: UpdateCommentDto,
    description: 'Updated comment details (only provided fields will be updated)',
    examples: {
      updateContent: {
        summary: 'Update Content',
        description: 'Example of updating comment content',
        value: {
          content: 'Updated comment with more details about the experience.'
        }
      },
      updateRating: {
        summary: 'Update Rating',
        description: 'Example of updating rating',
        value: {
          rating: 4
        }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Comment updated successfully',
    type: Comment
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Comment not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Comment not found' },
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
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete comment',
    description: 'Remove a comment from the system'
  })
  @ApiParam({
    name: 'id',
    description: 'Comment ID to delete',
    type: 'integer',
    example: 1
  })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Comment deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Comment deleted successfully' }
      }
    }
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: 'Comment not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Comment not found' },
        error: { type: 'string', example: 'Not Found' }
      }
    }
  })
  async remove(@Param('id') id: string) {
    return await this.commentsService.remove(+id);
  }
}
