import { Wine } from '@entities/wines.entity';
import { WineTypeEnum } from '@enums/wine-type.enum';
import { SearchDto } from 'src/dtos/search-dto';
import { Repository, EntityRepository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@EntityRepository(Wine)
export class WineRepository extends Repository<Wine> {
  async search(
    serial: string,
    type: WineTypeEnum,
    name: string,
    country: string,
    regions: string,
    year: number,
    options: IPaginationOptions
  ): Promise<Pagination<Wine>> {
    let searchData = this.createQueryBuilder('wines');
    let SerialNumber;
    let Producer;
    let SerialSymbol;
    if (serial) {
      if (serial.length <= 4) {
        Producer = serial;
        searchData.andWhere('wines.wineProducerSymbol = :Producer', { Producer });
      }
      else if (serial.length < 12) {
        SerialNumber = serial.substring(serial.length - 4);
        SerialSymbol = serial.substring(serial.length - 4, serial.length - 7);
        Producer = serial.substring(0, serial.length - 7);
        searchData
          .andWhere('wines.wineProducerSymbol = :Producer', { Producer })
          .andWhere('wines.wineSerialSymbol = :SerialSymbol', { SerialSymbol })
          .andWhere('wines.wineSerialNumber = :SerialNumber', { SerialNumber });
      } else {
        SerialNumber = serial.substring(serial.length - 6);
        Producer = serial.substring(0, serial.length - 9);
        SerialSymbol = serial.substring(serial.length - 6, serial.length - 9);
        searchData
          .andWhere('wines.wineProducerSymbol = :Producer', { Producer })
          .andWhere('wines.wineSerialSymbol = :SerialSymbol', { SerialSymbol })
          .andWhere('wines.wineSerialNumber = :SerialNumber', { SerialNumber });
      }
    }
    if(type){
        searchData.andWhere('wines.wineType = :type', { type })
    }
    if(name){
        searchData.andWhere('wines.wineName = :name', { name })
    }
    if(country){
        searchData.andWhere('wines.wineCountry = :country', { country })
    }
    if(regions){
        searchData.andWhere('wines.wineRegions = :regions', { regions })
    }
    if(year){
        searchData.andWhere('wines.wineYear = :year', { year })
    }
    console.log(Producer)
    return paginate<Wine>(searchData,options);
  }
}
