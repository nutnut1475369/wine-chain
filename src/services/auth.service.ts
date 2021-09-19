import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SigninUserService } from "@services/signin-users.service";
import { SigninUserDto } from "../dtos/signin-user.dto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService{
    constructor(
        private signinUserService:SigninUserService,
        private jwtService:JwtService
        ){}
    async signin(user: SigninUserDto){
        const data = await this.signinUserService.findOne(user.email)
        const check = await bcrypt.compare(user.password,data.userPassword);
        if(data && check){
            delete data.userPassword
            const payload = {
                email:data.userEmail,
                userid:data.userId,
                role:data.userRoleId,
                type:data.userTypeId
            }
            const jwt = await this.jwtService.signAsync(payload)
            return {"Token":jwt}
        }
        throw new UnauthorizedException();
    }
}