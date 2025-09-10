import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get welcome message',
    description: 'Returns a simple welcome message from the Burger Cafe API'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Welcome message returned successfully',
    schema: {
      type: 'string',
      example: 'Hello World!'
    }
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('env-test')
  @ApiOperation({ 
    summary: 'Test environment configuration',
    description: 'Returns environment variables for testing purposes (development only)'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Environment variables returned successfully',
    schema: {
      type: 'object',
      properties: {
        port: { type: 'number', example: 3000 },
        dbHost: { type: 'string', example: 'localhost' },
        dbPort: { type: 'number', example: 5432 }
      }
    }
  })
  getEnvTest(): any {
    return this.appService.getEnvTest();
  }
}
