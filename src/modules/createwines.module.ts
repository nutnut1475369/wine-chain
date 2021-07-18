import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerRepository } from '@repositories/producers.repository';
import { TransferRepository } from '@repositories/transfers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { CreateWineService } from '@services/createwine.service';
import { CreateWineController } from 'src/controllers/createwines.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProducerRepository,
    TransferRepository,
    UserRepository,
    WineRepository
  ]),
  AuthModule,
  JwtStrategy
],
  providers: [CreateWineService],
  controllers: [CreateWineController],
  exports: [TypeOrmModule]
})
export class WinesModule {}