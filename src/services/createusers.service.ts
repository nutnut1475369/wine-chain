import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/users.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Producer } from '@entities/producers.entity';
import { Address } from '@entities/addresses.entity';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '@repositories/users.repository';

@Injectable()
export class CreateUsersService {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    @InjectRepository(Producer)
    private ProducersRepository: Repository<Producer>,
    @InjectRepository(Address)
    private AddressesRepository: Repository<Address>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    if (
      (await this.usersRepository.findEmail(createUserDto.email)) !==
      undefined
    ) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'This email has been already used.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = new User();
    const address: Address = new Address();

    if (createUserDto.type === 3) {
      const producer: Producer = new Producer();
      producer.producerSymbol = createUserDto.producersymbol.toUpperCase();
      producer.producerSerialCount = 0;
      const producerid = await this.ProducersRepository.save(producer);
      user.userProducerId = producerid.producerId;
    }
    address.addressAddress = createUserDto.address;
    address.addressStreetName = createUserDto.streetname;
    address.addressState = createUserDto.state;
    address.addressPostcode = createUserDto.postcode;
    address.addressCity = createUserDto.city;
    address.addressCountry = createUserDto.country;
    const addressid = await this.AddressesRepository.save(address);
    user.userName = createUserDto.name;
    user.userLastname = createUserDto.lastname;
    user.userEmail = createUserDto.email;
    user.userRoleId = createUserDto.role;
    user.userTypeId = createUserDto.type;
    user.userAddressId = addressid.addressId;
    user.userPassword = await bcrypt.hash(createUserDto.password, 12);
    console.log(user);
    try {
      await this.usersRepository.save(user);
      return ;
    } catch (error) {
      if (error) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Have something wrong',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
