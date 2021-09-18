import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferRepository } from '@repositories/transfers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { TransferService } from '@services/transfer.service';
import { TransferController } from 'src/controllers/transfer.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthModule } from './auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([
      TransferRepository,
      UserRepository,
      WineRepository
    ]),
    AuthModule,
    JwtStrategy
  ],
    providers: [TransferService],
    controllers: [TransferController],
    exports: [TypeOrmModule]
  })
export class TransferModule{}