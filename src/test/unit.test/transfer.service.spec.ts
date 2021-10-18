import { Transfer } from "@entities/transfers.entity";
import { User } from "@entities/users.entity";
import { Wine } from "@entities/wines.entity";
import { WineTypeEnum } from "@enums/wine-type.enum";
import { HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { TransferRepository } from "@repositories/transfers.repository";
import { UserRepository } from "@repositories/users.repository";
import { WineRepository } from "@repositories/wines.repository";
import { TransferService } from "@services/transfer.service";
import { TransferDto } from "src/dtos/transfer.dto";

describe('TransferService',()=>{
    let app:TestingModule;
    let transferService: TransferService
    let userRepository:UserRepository
    let wineRepository:WineRepository
    let transferRepository:TransferRepository
    const transferTar: TransferDto = {
        email: "test@hotmail.com",
        wineId: 1
    };

    const userOwner = 2
    const userTar = 1
    beforeEach(async () => {
        app = await Test.createTestingModule({
            providers: [
                TransferService,
                UserRepository,
                WineRepository,
                TransferRepository,
            ],
        }).compile();
        transferService = app.get<TransferService>(TransferService);
        userRepository = app.get<UserRepository>(UserRepository);
        wineRepository = app.get<WineRepository>(WineRepository);
        transferRepository = app.get<TransferRepository>(TransferRepository);
    })
    it('Should throw error when user target undefined',async () => {
        jest.spyOn(userRepository,'findEmail').mockImplementation(()=>{
            return new Promise((resolve)=>{
                return resolve(undefined)
            })
        })
        try{ 
            await transferService.transferWine(transferTar,userOwner)
        }catch(actualException){
            expect(actualException.response.statusCode).toEqual(
                HttpStatus.NOT_FOUND,
              );
        }
    })
    it('Should throw error when wine not exist',async () => {
        jest.spyOn(wineRepository,'findOne').mockImplementation(()=>{
            return new Promise((resolve)=>{
                return resolve(undefined)
            })
        })
        jest.spyOn(userRepository,'findEmail').mockImplementation(()=>{
            return new Promise((resolve)=>{
                return resolve(new User());
            })
        })
        try{ 
            await transferService.transferWine(transferTar,userOwner)
        }catch(actualException){
            expect(actualException.response.statusCode).toEqual(
                HttpStatus.NOT_FOUND,
              );
        }
    })
    it('Should throw error when user not owner wine',async () => {
        jest.spyOn(wineRepository,'findOne').mockImplementation(()=>{
            return new Promise((resolve)=>{
                const wine =new Wine()
                wine.wineOwnerUserId = userTar
                return resolve(wine)
            })
        })
        jest.spyOn(userRepository,'findEmail').mockImplementation(()=>{
            return new Promise((resolve)=>{
                let user = new User();
                return resolve(user);
            })
        })
        try{ 
            await transferService.transferWine(transferTar,userOwner)
        }catch(actualException){
            expect(actualException.response.statusCode).toEqual(
                HttpStatus.NOT_FOUND,
              );
        }
    })
    it('Should success when wine changed owner',async () => {

        const expectTransfer = {
            transferUserIdReq : userOwner,
            transferUserIdTar : userTar,
            transferWineId : 1
        }
        const expectWine = new Wine()
        expectWine.wineOwnerUserId = userTar
        expectWine.wineId = 1
        jest.spyOn(wineRepository,'findOne').mockImplementation(()=>{
            return new Promise((resolve)=>{
                const wine = new Wine()
                wine.wineOwnerUserId = userOwner
                wine.wineId = 1
                return resolve(wine)
            })
        })
        jest.spyOn(userRepository,'findEmail').mockImplementation(()=>{
            return new Promise((resolve)=>{
                let user = new User();
                    user.userId = userTar;
                return resolve(user);
            })
        })   
        jest.spyOn(transferRepository,'save').mockImplementation(()=>{
            return new Promise((resolve)=>{
                return resolve(null);
            })
        })
        jest.spyOn(wineRepository,'save').mockImplementation(()=>{
            return new Promise((resolve)=>{
                return resolve(null);
            })
        })
        let result = await transferService.transferWine(transferTar,userOwner);
        expect(result).toEqual({});
        expect(wineRepository.save).toHaveBeenCalledWith(expectWine);
        expect(transferRepository.save).toHaveBeenCalledWith(expectTransfer);
    })
})