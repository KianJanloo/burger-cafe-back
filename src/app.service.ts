import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getEnvTest(): any {
    return {
      dbHost: this.configService.get('DB_HOST'),
      dbPort: this.configService.get('DB_PORT'),
      dbUsername: this.configService.get('DB_USERNAME'),
      dbName: this.configService.get('DB_NAME'),
      nodeEnv: this.configService.get('NODE_ENV'),
      port: this.configService.get('PORT'),
    };
  }
}
