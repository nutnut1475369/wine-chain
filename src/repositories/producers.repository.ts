import { Producer } from '@entities/producers.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Producer)
export class ProducerRepository extends Repository<Producer>{
    async findProducer(producerId:number):Promise<Producer>{
        return this.createQueryBuilder("producers")
        .where("producers.producerId = :producerId",{ producerId })
        .getOne()
    }
}