import { Address } from '@entities/addresses.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address>{

}