import { WineTypeEnum } from "@enums/wine-type.enum"
import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsEnum, IsOptional } from "class-validator"

export class SearchDto{

    @ApiPropertyOptional()
    @IsOptional()
    page:number   

    @ApiPropertyOptional()
    @IsOptional()
    serial:string   

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(WineTypeEnum, { each: true })
    type:WineTypeEnum   

    @ApiPropertyOptional()
    @IsOptional()
    name:string
    
    @ApiPropertyOptional()
    @IsOptional()
    country:string
    
    @ApiPropertyOptional()
    @IsOptional()
    regions:string
    
    @ApiPropertyOptional()
    @IsOptional()
    year:number

}