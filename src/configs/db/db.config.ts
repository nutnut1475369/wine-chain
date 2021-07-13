import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getConfigBoolean } from '../config';

@Injectable()
export class DbConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const logging = getConfigBoolean('DB_LOGGING_ENABLE');
    return {
      name: 'default',
      type: 'postgres',
      logging,
      host: this.configService.get('DB_HOST'),
      port: Number(this.configService.get('DB_PORT')),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_NAME'),
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
      extra: {
        connectionLimit: 30,
      },
    };
  }
}
