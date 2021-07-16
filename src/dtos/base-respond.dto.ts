import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class BaseRespondDto {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string[] | string

}