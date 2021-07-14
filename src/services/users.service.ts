import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@entities/users.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { Producer } from '@entities/producers.entity';
import { Address } from '@entities/addresses.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Producer)
    private ProducersRepository: Repository<Producer>,
    @InjectRepository(Address)
    private AddressesRepository: Repository<Address>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const producer = new Producer();
    producer.producerSymbol = createUserDto.userProducerSymbol;
    producer.producerSerialCount = 0;
    const producerid = await this.ProducersRepository.save(Producer);
    const address = new Address();
    address.addressAddress = createUserDto.userAddressAddress;
    address.addressStreetName = createUserDto.userAddressStreetName;
    address.addressState = createUserDto.userAddressState;
    address.addressPostcode = createUserDto.userAddressPostcode;
    address.addressCity = createUserDto.userAddressCity;
    address.addressCountry = createUserDto.userAddressCountry;
    const addressid = await this.AddressesRepository.save(address);
    const user = new User();
    user.userName = createUserDto.userName;
    user.userLastname = createUserDto.userLastname;
    user.userEmail = createUserDto.userEmail;
    user.userProducerId = producerid.producerId;
    user.userRoleId = createUserDto.userRoleId;
    user.userTypeId = createUserDto.userTypeId;
    user.userAddressId = addressid.addressId;
    user.userPassword = await bcrypt.hash(createUserDto.userPassword, 12);
    this.logger.log(user);
    try {
      return await this.usersRepository.save(User);
    } catch (error) {
      if (error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Have something wrong',
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.OK,
            error: 'Success',
          },
          HttpStatus.OK,
        );
      }
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
