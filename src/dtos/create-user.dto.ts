import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { UserRoleEnum } from '@enums/user-role.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty()
	@IsNotEmpty()
	@MaxLength(255)
	userName: string;

    @ApiProperty()
	@IsNotEmpty()
	@MaxLength(255)
	userLastname: string;

    @ApiProperty()
    @IsNotEmpty()
	@IsEmail()
	@MaxLength(255)
    userEmail: string;

    @ApiProperty()
    @IsNotEmpty()
    userPassword: number;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(4)
    userProducerSymbol: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(UserRoleEnum, { each: true })
    userRoleId: UserRoleEnum;

    @IsNotEmpty()
	@IsEmail()
    @IsEnum(UserTypeEnum, { each: true })
    userTypeId: number;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    userAddressAddress: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    userAddressStreetName: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    userAddressState: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(255)
    userAddressPostcode: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(100)
    userAddressCity: string;

    @ApiProperty()
    @IsNotEmpty()
	@MaxLength(100)
    userAddressCountry: string;

    @ApiProperty()
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty()
    @IsNotEmpty()
    updatedAt: Date;
}