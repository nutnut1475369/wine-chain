import { Transfer } from '@entities/transfers.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Transfer)
export class TransferRepository extends Repository<Transfer>{

}