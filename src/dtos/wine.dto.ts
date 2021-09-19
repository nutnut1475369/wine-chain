import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WineTypeEnum } from '@enums/wine-type.enum';
export class WineDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(WineTypeEnum, { each: true })
    type:WineTypeEnum   

    @ApiProperty()
    @IsNotEmpty()
    name:string
    
    @ApiProperty()
    @IsNotEmpty()
    country:string
    
    @ApiProperty()
    @IsNotEmpty()
    regions:string
    
    @ApiPropertyOptional()
    @IsOptional()
    description:string
    
    @ApiProperty()
    @IsNotEmpty()
    year:number
    
    @ApiProperty()
    @IsNotEmpty()
    count:number

}