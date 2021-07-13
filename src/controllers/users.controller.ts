import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "@services/users.service";
import { CreateUserDto } from "src/dtos/create-user.dto";

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('signup')
    async createUser(@Body() createUserDto:CreateUserDto):Promise<any>{
        await this.userService.create(createUserDto)
    }
}