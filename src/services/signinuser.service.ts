import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "@repositories/users.repository";

@Injectable()
export class SigninUserService {
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
    ){}
    async findOne(email:string):Promise<any>{
        const check = await this.usersRepository.findEmail(email)
        if(check === undefined){
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: "This email did't exist."
                },HttpStatus.NOT_FOUND
            )
        }
        return check;
    }
}