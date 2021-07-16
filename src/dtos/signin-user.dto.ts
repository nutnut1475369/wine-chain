import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty} from '@nestjs/swagger';

export class SigninUserDto {

    @ApiProperty()
    @IsNotEmpty()
	@IsEmail()
	@MaxLength(255)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

}