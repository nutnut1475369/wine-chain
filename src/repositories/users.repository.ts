import { User } from '@entities/users.entity';
import { Repository, EntityRepository} from "typeorm";
import * as bcrypt from "bcrypt"

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async findDupicateUser(email:string): Promise<User>{
        return this.createQueryBuilder("users")
        .where("users.userEmail = :email", { email })
        .getOne()
    }
    async findEmail(email:string): Promise<User>{
        return this.createQueryBuilder("users")
        .where("users.userEmail = :email", { email })
        .getOne()
    }
}