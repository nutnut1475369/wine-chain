import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './createusers.module';
import { DbConfig } from '@configs/db/db.config';
import { envConfig } from '@configs/envConfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthModule } from 'src/modules/auth.module';
import { AuthController } from 'src/controllers/auth.controller';
import { WinesModule } from './createwines.module';
import { TransferModule } from './transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    TypeOrmModule.forRootAsync({
			useClass: DbConfig,
		}
),
  UsersModule,
  AuthModule,
  WinesModule,
  TransferModule
  
  ],
  controllers: [AuthController],
  providers:[
    {
			provide: APP_INTERCEPTOR,
			useClass: TransformInterceptor
		}
  ]
})
export class AppModule {}
