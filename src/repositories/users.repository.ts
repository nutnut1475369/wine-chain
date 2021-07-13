import { User } from '@entities/users.entity';
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

}