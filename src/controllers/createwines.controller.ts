import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { CreateWineService } from "@services/createwine.service";
import { CreateWineDto } from "src/dtos/create-wine.dto";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";

@Controller()
export class CreateWineController{
    constructor(
        private readonly createWineService:CreateWineService
    ){}

    @Post('createwine')
    @UseGuards(JwtAuthGuard)
    async createWine(
        @Body() createWineDto:CreateWineDto,
        @Request() req
        ):Promise<any>{
        return await this.createWineService.createwine(createWineDto, req.user.email)
    }
}