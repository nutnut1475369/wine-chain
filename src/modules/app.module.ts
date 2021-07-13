import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "123456",
      "database": "wine",
      "entities": ['dist/**/*.entity{ .ts,.js}'],
      "synchronize": true
  }),
  UsersModule
  ]
})
export class AppModule {}
