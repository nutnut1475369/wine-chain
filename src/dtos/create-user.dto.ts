import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { UserRoleEnum } from '@enums/user-role.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
	@IsNotEmpty()
	@MaxLength(255)
	name: string;

    @ApiProperty()
	@IsNotEmpty()
	@MaxLength(255)
	lastname: string;

    @ApiProperty()
    @IsNotEmpty()
	@IsEmail()
	@MaxLength(255)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
	@MaxLength(4)
    producersymbol: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserRoleEnum, { each: true })
    role: UserRoleEnum;

    @IsNotEmpty()
    @IsEnum(UserTypeEnum, { each: true })
    type: UserTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    address: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    streetname: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    state: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    postcode: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(100)
    city: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(100)
    country: string;

}