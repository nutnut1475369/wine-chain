import { Wine } from "@entities/wines.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProducerRepository } from "@repositories/producers.repository";
import { UserRepository } from "@repositories/users.repository";
import { CreateWineDto } from "src/dtos/create-wine.dto";
import { Repository } from "typeorm";
import { GenerateSerial } from "../utilities/generateserial.utility"

@Injectable()
export class CreateWineService{
    constructor(
        @InjectRepository(UserRepository)
        private usersRepository: UserRepository,
        @InjectRepository(Wine)
        private wine: Repository<Wine>,
        @InjectRepository(ProducerRepository)
        private producerRepository: ProducerRepository,
    ){}
    async createwine(createWineDto: CreateWineDto ,email:string):Promise<any>{
        const wines:Wine = new Wine()
        console.log(email)
        const user = await this.usersRepository.findEmail(email)
        const producer = await this.producerRepository.findProducer(user.userProducerId)
        if(producer === undefined || user === undefined){
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    error: 'Somethimg not correct.',
                  },
                  HttpStatus.BAD_REQUEST,
            )
        }
        for(let i = 1;i<=createWineDto.count;i++){
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
            const winedetail = await this.wine.insert(wines);
            console.log(winedetail)

        }
        producer.producerSerialCount = producer.producerSerialCount + 1
        await producer.save()
        return {};
    }
}