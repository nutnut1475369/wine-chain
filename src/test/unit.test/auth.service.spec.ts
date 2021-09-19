import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@services/auth.service';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { UsersModule } from '../../modules/create-users.module';
import { UserRoleEnum } from '@enums/user-role.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { SigninUserService } from '@services/signin-users.service';
import { User } from '@entities/users.entity';
import * as bcrypt from 'bcrypt';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from '@configs/envConfig';
import { AddressRepository } from '@repositories/addresses.repository';
import { ProducerRepository } from '@repositories/producers.repository';
import { TransferRepository } from '@repositories/transfers.repository';
import { UserRepository } from '@repositories/users.repository';
import { WineRepository } from '@repositories/wines.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';
describe('AuthService', () => {
  let authService: AuthService;
  let app: TestingModule;
  let signinUserService: SigninUserService;
  let userRepository: UserRepository;
  const mockUserSignin = {
    email: 'test@hotmail.com',
    password: '123456',
  };
  beforeEach(async () => {
    process.env['JWT_SECRET'] = 'secret';
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(envConfig()),
        JwtStrategy,
        PassportModule,
        JwtModule.register({
          secret: process.env['JWT_SECRET'],
          signOptions: { expiresIn: '60000s' },
        }),
      ],
      providers: [AuthService, JwtStrategy, SigninUserService, UserRepository],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    signinUserService = app.get<SigninUserService>(SigninUserService);
    userRepository = app.get<UserRepository>(UserRepository);
    jest.spyOn(signinUserService, 'findOne').mockImplementation(() => {
      return new Promise((resolve) => {
        let data = new User();
        data.userEmail = 'test@hotmail.com';
        data.userPassword = '123456';
        data.userId = 1111;
        data.userRoleId = UserRoleEnum.USER;
        data.userTypeId = UserTypeEnum.CUSTOMER;
        return resolve(data);
      });
    });
  });

  it('should return JWT object when credentials are valid', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(true);
      });
    });
    const res = await authService.signin(mockUserSignin);
    expect(res.Token).toBeDefined();
  });

  it('should throw', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
      return new Promise((resolve) => {
        return resolve(false);
      });
    });
    try {
      await authService.signin(mockUserSignin);
    } catch(actualException) {
        expect(actualException.response.statusCode).toEqual(
            HttpStatus.UNAUTHORIZED,
          );
    }
  });
});
