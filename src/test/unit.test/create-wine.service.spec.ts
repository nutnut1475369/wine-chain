import { Producer } from '@entities/producers.entity';
import { User } from '@entities/users.entity';
import { Wine } from '@entities/wines.entity';
import { WineTypeEnum } from '@enums/wine-type.enum';
import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProducerRepository } from '@repositories/producers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { CreateWineService } from '@services/create-wines.service';
import { InsertResult } from 'typeorm';
import { WineDto } from '../../dtos/wine.dto';
import { GenerateSerial } from '../../utilities/generateserial.utility';

describe('CreateWineService', () => {
  let app: TestingModule;
  let createWineService: CreateWineService;
  let usersRepository: UserRepository;
  let wineRepository: WineRepository;
  let producerRepository: ProducerRepository;
  const email = 'test@hotmail.com';
  let newWine: WineDto = {
    type: WineTypeEnum.DESSERT,
    name: 'string',
    country: 'string',
    regions: 'string',
    description: 'string',
    year: 1999,
    count: 1,
  };
  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        CreateWineService,
        UserRepository,
        ProducerRepository,
        WineRepository,
      ],
    }).compile();
    createWineService = app.get<CreateWineService>(CreateWineService);
    usersRepository = app.get<UserRepository>(UserRepository);
    wineRepository = app.get<WineRepository>(WineRepository);
    producerRepository = app.get<ProducerRepository>(ProducerRepository);
    jest.spyOn(wineRepository, 'insert').mockImplementation(() => {
      return new Promise<InsertResult>((resolve) => {
        return resolve(new InsertResult());
      });
    });
  });
  it('Should throw error when user not found ', async () => {
    jest.spyOn(usersRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(undefined);
      });
    });
    try {
      await createWineService.createwine(newWine, email);
    } catch (actualException) {
      expect(actualException.response.statusCode).toEqual(
        HttpStatus.BAD_REQUEST,
      );
    }
  });
  it('Should throw error when producer not found ', async () => {
    jest.spyOn(usersRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        let newUser = new User();
        newUser.userProducerId = 1111;
        return resolve(newUser);
      });
    });
    jest.spyOn(producerRepository, 'findProducer').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(undefined);
      });
    });
    try {
      await createWineService.createwine(newWine, email);
    } catch (actualException) {
      expect(actualException.response.statusCode).toEqual(
        HttpStatus.BAD_REQUEST,
      );
    }
  });
  it('Should success when count < 10000 ', async () => {
    const expectWine = {
      wineProducerSymbol: 'AAA',
      wineSerialSymbol: GenerateSerial.serailId(0),
      wineSerialNumber: GenerateSerial.serialSymbol(newWine.count, 1),
      wineName: newWine.name,
      wineType: newWine.type,
      wineCountry: newWine.country,
      wineRegions: newWine.regions,
      wineDescription: newWine.description,
      wineYear: newWine.year,
      wineOwnerUserId: 1111,
      wineCount: newWine.count,
      wineStatus: true,
    };
    jest.spyOn(usersRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        let newUser = new User();
        newUser.userId = 1111;
        return resolve(newUser);
      });
    });
    jest.spyOn(producerRepository, 'findProducer').mockImplementation(() => {
      return new Promise((resolve) => {
        let newProducer = new Producer();
        newProducer.producerSymbol = 'AAA';
        newProducer.producerSerialCount = 0;
        newProducer.save = jest.fn()
        return resolve(newProducer);
      });
    });
    jest.spyOn(producerRepository, 'save').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(null);
      });
    });
    let result = await createWineService.createwine(newWine, email);
    expect(result).toEqual({});
    expect(wineRepository.insert).toBeCalledWith(expectWine);
  });
  it('Should success when count > 10000 ', async () => {
    newWine.count = 10001
    let expectWine = {
      wineProducerSymbol: 'AAA',
      wineSerialSymbol: GenerateSerial.serailId(0),
      wineSerialNumber: GenerateSerial.serialSymbol(1, 2),
      wineName: newWine.name,
      wineType: newWine.type,
      wineCountry: newWine.country,
      wineRegions: newWine.regions,
      wineDescription: newWine.description,
      wineYear: newWine.year,
      wineOwnerUserId: 1111,
      wineCount: 1,
      wineStatus: true,
    };
    
    jest.spyOn(usersRepository, 'findEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        let newUser = new User();
        newUser.userId = 1111;
        return resolve(newUser);
      });
    });
    jest.spyOn(producerRepository, 'findProducer').mockImplementation(() => {
      return new Promise((resolve) => {
        let newProducer = new Producer();
        newProducer.producerSymbol = 'AAA';
        newProducer.producerSerialCount = 0;
        newProducer.save = jest.fn()
        return resolve(newProducer);
      });
    });
    jest.spyOn(producerRepository, 'save').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(null);
      });
    });
    let result = await createWineService.createwine(newWine, email);
    expect(result).toEqual({});
    expect(wineRepository.insert).toHaveBeenCalledWith(expectWine)
    expectWine.wineSerialNumber=GenerateSerial.serialSymbol(newWine.count, 2)
    expectWine.wineCount = newWine.count
    expect(wineRepository.insert).toHaveBeenLastCalledWith(expectWine)
  });
});
