import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { AddressRepository } from '@repositories/addresses.repository';
import { ProducerRepository } from '@repositories/producers.repository';
import { TransferRepository } from '@repositories/transfers.repository';
import { TypeRepository } from '@repositories/types.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    AddressRepository,
    ProducerRepository,
    TransferRepository,
    TypeRepository,
    UserRepository,
    WineRepository
  ])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule]
})
export class UsersModule {}