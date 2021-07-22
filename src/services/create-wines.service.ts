import { Wine } from "@entities/wines.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProducerRepository } from "@repositories/producers.repository";
import { UserRepository } from "@repositories/users.repository";
import { WineRepository } from "@repositories/wines.repository";
import { WineDto } from "src/dtos/wine.dto";
import { Repository } from "typeorm";
import { GenerateSerial } from "../utilities/generateserial.utility"

@Injectable()
export class CreateWineService{
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        @InjectRepository(WineRepository)
        private wineRepository: WineRepository,
        @InjectRepository(ProducerRepository)
        private producerRepository: ProducerRepository,
    ){}
    async createwine(createWineDto: WineDto ,email:string):Promise<any>{
        
        console.log(email)
        const user = await this.usersRepository.findEmail(email)
        if(user === undefined){
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: 'Somethimg not correct.',
                  },
                  HttpStatus.BAD_REQUEST,
            )
        }
        const producer = await this.producerRepository.findProducer(user.userProducerId)
        if(producer === undefined){
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: 'Somethimg not correct.',
                  },
                  HttpStatus.BAD_REQUEST,
            )
        }
        for(let i = 1;i<=createWineDto.count;i++){
            const wines:Wine = new Wine()
            wines.wineProducerSymbol = producer.producerSymbol
            wines.wineSerialSymbol = GenerateSerial.serailId(producer.producerSerialCount)
            if(createWineDto.count<10000){
                wines.wineSerialNumber = GenerateSerial.serialSymbol(i,1)
            }else{
                wines.wineSerialNumber = GenerateSerial.serialSymbol(i,2)
            }
            wines.wineName = createWineDto.name
            wines.wineType = createWineDto.type
            wines.wineCountry = createWineDto.country
            wines.wineRegions = createWineDto.regions
            wines.wineDescription = createWineDto.description
            wines.wineYear = createWineDto.year
            wines.wineOwnerUserId = user.userId
            wines.wineCount = i
            wines.wineStatus = true
            await this.wineRepository.insert(wines);

        }
        producer.producerSerialCount = producer.producerSerialCount + 1
        await producer.save()
        return {};
    }
}