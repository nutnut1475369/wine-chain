import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUsersService } from '../services/create-users.service';
import { UsersController } from '../controllers/createusers.controller';
import { AddressRepository } from '@repositories/addresses.repository';
import { ProducerRepository } from '@repositories/producers.repository';
import { TransferRepository } from '@repositories/transfers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { SigninUserService } from '@services/signin-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    AddressRepository,
    ProducerRepository,
    TransferRepository,
    UserRepository,
    WineRepository
  ])
],
  providers: [CreateUsersService,SigninUserService],
  controllers: [UsersController],
  exports: [TypeOrmModule,SigninUserService]
})
export class UsersModule {}