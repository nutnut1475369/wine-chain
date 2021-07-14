import { Wine } from '@entities/wines.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Wine)
export class WineRepository extends Repository<Wine>{

}