import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";
import { CreateWineService } from "@services/create-wines.service";
import { WineDto } from "src/dtos/wine.dto";
import { JwtAuthGuard } from "src/guard/jwt-auth.guard";

@Controller()
export class CreateWineController{
    constructor(
        private readonly createWineService:CreateWineService
    ){}

    @Post('createwine')
    @UseGuards(JwtAuthGuard)
    async createWine(
        @Body() createWineDto:WineDto,
        @Request() req
        ):Promise<any>{
        return await this.createWineService.createwine(createWineDto, req.user.email)
    }
}