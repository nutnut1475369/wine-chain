import { Address } from '@entities/addresses.entity';
import { Producer } from '@entities/producers.entity';
import { User } from '@entities/users.entity';
import { UserRoleEnum } from '@enums/user-role.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressRepository } from '@repositories/addresses.repository';
import { ProducerRepository } from '@repositories/producers.repository';
import { UserRepository } from '@repositories/users.repository';
import { CreateUsersService } from '@services/create-users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { getRepository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { resolve } from 'path';
import * as bcrypt from 'bcrypt'
describe('CreateUsersService', () => {
  let app: TestingModule;
  let createUsersService: CreateUsersService;
  let userRepository: UserRepository;
  let producersRepository: ProducerRepository;
  let addressesRepository: AddressRepository;
  let newUser: CreateUserDto = {
    name: 'name',
    lastname: 'lastname',
    email: 'email@hotmail.com',
    password: 'password',
    producersymbol: 'test',
    type: UserTypeEnum.PRODUCER,
    address: 'address',
    streetname: 'streetname',
    state: 'state',
    postcode: 'postcode',
    city: 'city',
    country: 'country',
  };
  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        CreateUsersService,
        UserRepository,
        ProducerRepository,
        AddressRepository,
      ],
    }).compile();

    userRepository = app.get<UserRepository>(UserRepository);
    producersRepository = app.get<ProducerRepository>(ProducerRepository);
    addressesRepository = app.get<AddressRepository>(AddressRepository);
    createUsersService = app.get<CreateUsersService>(CreateUsersService);
    jest.spyOn(addressesRepository, 'save').mockImplementation(() => {
      return new Promise((resolve) => {
        let newAddress = new Address()
        newAddress.addressId = 1111
        return resolve(newAddress);
      });
    });
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
        return new Promise((resolve) => {
          return resolve('password');
        });
      });
  });
  it('Should return successed in case type producer', async () => {
    jest.spyOn(userRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(undefined);
      });
    });
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(null);
      });
    });
    jest.spyOn(producersRepository, 'save').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(new Producer());
      });
    });

    let result = await createUsersService.create(newUser);
    expect(result).toEqual({});
    expect(producersRepository.save).toBeCalled();
  });
  it('Should return success in case type customer and seller .', async () => {
    newUser.type = UserTypeEnum.CUSTOMER;
    const expectUser = {
      userName: newUser.name,
      userLastname: newUser.lastname,
      userEmail: newUser.email,
      userPassword: 'password',
      userTypeId: newUser.type,
      userRoleId: UserRoleEnum.USER,
      userAddressId: 1111,
    };
    jest.spyOn(userRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(undefined);
      });
    });
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
        return new Promise((resolve) => {
          return resolve(null);
        });
      });
    let result = await createUsersService.create(newUser);
    expect(result).toEqual({});
    expect(userRepository.save).toBeCalledWith(expectUser);
    
  });
  it('Should throw error when email is duplicated.', async () => {
    jest.spyOn(userRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(new User());
      });
    });
    try {
      await createUsersService.create(newUser);
    } catch (actualException) {
      expect(actualException.response.statusCode).toEqual(
        HttpStatus.BAD_REQUEST,
      );
    }
  });
  it('Should throw error when user can not save.', async () => {

    jest.spyOn(userRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(undefined);
      });
    });
    jest.spyOn(userRepository, 'save').mockImplementation(() => {
      throw new Error('smt')
    });
    try {
      await createUsersService.create(newUser);
    } catch (actualException) {
      expect(actualException.response.statusCode).toEqual(
        HttpStatus.BAD_REQUEST,
      );
    }
  });
});
