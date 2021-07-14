import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { DbConfig } from '@configs/db/db.config';
import { envConfig } from '@configs/envConfig';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRootAsync({
			useClass: DbConfig,
		}
),
  UsersModule
  ]
})
export class AppModule {}
