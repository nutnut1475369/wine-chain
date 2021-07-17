import { Body, Controller, Post} from "@nestjs/common";
import { CreateUsersService } from "@services/createusers.service";
import { CreateUserDto } from "src/dtos/create-user.dto";

@Controller()
export class UsersController {
    constructor(
        private readonly createUsersService: CreateUsersService,
        ) {}

    @Post('signup')
    async createUser(@Body() createUserDto:CreateUserDto):Promise<any>{
        return await this.createUsersService.create(createUserDto)
    }

}