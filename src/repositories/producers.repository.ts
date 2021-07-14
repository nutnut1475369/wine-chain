import { Producer } from '@entities/producers.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer>{

}