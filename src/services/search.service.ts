import { Wine } from '@entities/wines.entity';
import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProducerRepository } from '@repositories/producers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { SearchDto } from 'src/dtos/search-dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(WineRepository)
    private wineRepository: WineRepository,
  ) {}
  async search(searchDto: SearchDto){
      const options = {
        page : searchDto.page,
        limit: 15
      }
    const data:Pagination<Wine> = await this.wineRepository.search(
        searchDto.serial,
        searchDto.type,
        searchDto.name,
        searchDto.country,
        searchDto.regions,
        searchDto.year,
        options
      );
      console.log(data)
      console.log(data.items)
    return data
  }
}
