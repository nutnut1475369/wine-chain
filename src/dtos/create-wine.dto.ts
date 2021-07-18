import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WineTypeEnum } from '@enums/wine-type.enum';
export class CreateWineDto {

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
    
    @ApiProperty()
    @IsNotEmpty()
    description:string
    
    @ApiProperty()
    @IsNotEmpty()
    year:number
    
    @ApiProperty()
    @IsNotEmpty()
    count:number

}