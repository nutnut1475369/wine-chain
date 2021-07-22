import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './create-users.module';
import { DbConfig } from '@configs/db/db.config';
import { envConfig } from '@configs/envConfig';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AuthModule } from 'src/modules/auth.module';
import { AuthController } from 'src/controllers/auth.controller';
import { WinesModule } from './create-wines.module';
import { SearchModule } from './search.module';

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
  SearchModule
  
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
