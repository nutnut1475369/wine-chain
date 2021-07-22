import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducerRepository } from '@repositories/producers.repository';
import { TransferRepository } from '@repositories/transfers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { SearchService } from '@services/search.service';
import { SearchController } from 'src/controllers/search.controller';

@Module({
    imports:[TypeOrmModule.forFeature([
        ProducerRepository,
        TransferRepository,
        UserRepository,
        WineRepository
      ]),
    ],
    providers:[SearchService],
    controllers:[SearchController], 
    exports:[TypeOrmModule]
})
export class SearchModule{}
