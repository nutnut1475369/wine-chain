import { Transfer } from "@entities/transfers.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransferRepository } from "@repositories/transfers.repository";
import { UserRepository } from "@repositories/users.repository";
import { WineRepository } from "@repositories/wines.repository";
import { TransferDto } from "src/dtos/transfer.dto";
import { Repository } from "typeorm";

@Injectable()
export class TransferService{
    constructor(
        @InjectRepository(Transfer)
        private transfer:Repository<Transfer>,        
        @InjectRepository(WineRepository)
        private wineRepository:WineRepository,        
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){}
    async transferWine(transferDto:TransferDto,userId:number):Promise<any>{
        const transferWine:Transfer = new Transfer()
        const userTar = await this.userRepository.findEmail(transferDto.email)
        if(userTar === undefined){
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: "This email did't exist."
                },HttpStatus.NOT_FOUND
            )
        }
        const wine = await this.wineRepository.findOne({ where: { wineId : transferDto.wineId} })
        if(wine === undefined){
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: "this Wine did't exist."
                },HttpStatus.NOT_FOUND
            )
        }
        if(wine.wineOwnerUserId !== userId){
            throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    error: "you're not owner this wine."
                },HttpStatus.NOT_ACCEPTABLE
            )
        }
        console.log(userTar)
        console.log(wine)
        console.log(userId)
        transferWine.transferUserIdReq = userId
        transferWine.transferUserIdTar = userTar.userId
        transferWine.transferWineId = wine.wineId
        wine.wineOwnerUserId = userTar.userId
        await wine.save()
        await this.transfer.save(transferWine)
        return {}
    }
}