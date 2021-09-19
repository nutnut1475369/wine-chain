import { User } from "@entities/users.entity";
import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"
import { UserRepository } from "@repositories/users.repository";
import { SigninUserDto } from "src/dtos/signin-user.dto";
import { SigninUserService } from "../../services/signin-users.service"

describe('SigninUserService',() => {
    let app : TestingModule;
    let signinUserService: SigninUserService
    let usersRepository: UserRepository
    let mockUserSignin:SigninUserDto = {
        email : "test@hotmail.com",
        password : "test"
    }
    beforeEach(async ()=>{
        app = await Test.createTestingModule({
            providers:[
                SigninUserService,
                UserRepository
            ]
        }).compile()
        usersRepository = app.get<UserRepository>(UserRepository)
        signinUserService = app.get<SigninUserService>(SigninUserService)
    })
    it('Should return success.',async ()=>{
        jest.spyOn(usersRepository,'findEmail').mockImplementation(()=>{
            return new Promise(resolve=>{
                return resolve(new User())
            })
        })
        let result =   await signinUserService.findOne(mockUserSignin.email)
        expect(result).toEqual({})
    })
    it('Should throw when email did not exist.',async ()=>{
        jest.spyOn(usersRepository,'findEmail').mockImplementation(()=>{
            return new Promise(resolve=>{
                return resolve(undefined)
            })
        })
        try{
            await signinUserService.findOne(mockUserSignin.email)
        }catch (actualException) {
            expect(actualException.response.statusCode).toEqual(
              HttpStatus.NOT_FOUND,
            );
          }
    })
})