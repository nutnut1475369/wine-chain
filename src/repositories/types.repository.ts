import { Type } from '@entities/types.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Type)
export class TypeRepository extends Repository<Type>{

}