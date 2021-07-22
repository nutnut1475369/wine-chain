import { Wine } from "@entities/wines.entity";
import { Body, Controller, Post } from "@nestjs/common";
import { SearchService } from "@services/search.service";
import { SearchDto } from "src/dtos/search-dto";

@Controller()
export class SearchController{
    constructor(
        private readonly searchService:SearchService
    ){}
    @Post('search')
    async searchWine(
        @Body() searchDto:SearchDto
        ):Promise<Wine[]>{
        return await this.searchService.search(searchDto)
    }
}