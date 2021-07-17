import { User } from '@entities/users.entity';
import { Repository, EntityRepository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async findEmail(email:string): Promise<User>{
        return this.createQueryBuilder("users")
        .where("users.userEmail = :email", { email })
        .getOne()
    }
}