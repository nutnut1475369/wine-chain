import { Wine } from "@entities/wines.entity"
import { WineTypeEnum } from "@enums/wine-type.enum"
import { Test, TestingModule } from "@nestjs/testing"
import { WineRepository } from "@repositories/wines.repository"
import { SearchService } from "@services/search.service"
import { IPaginationLinks, IPaginationMeta, Pagination } from "nestjs-typeorm-paginate"
import { SearchDto } from "src/dtos/search-dto"

describe('SearchService',()=>{
    let app : TestingModule
    let wineRepository: WineRepository
    let searchService:SearchService
    const dataRes = {
        items: [{
            wineId: 1,
            wineProducerSymbol: 'AAA',
            wineSerialSymbol: 'AAA',
            wineSerialNumber: 'AA0001',
            wineName: 'name',
            wineType: WineTypeEnum.WHITE,
            wineCountry: 'Thailand',
            wineRegions: 'test',
            wineDescription: 'test',
            wineYear: 1999,
            wineCount: 1,
            wineOwnerUserId: 1,
            wineStatus: true
          }],
        meta: {
            totalItems: 0,
            itemCount: 0,
            itemsPerPage: 15,
            totalPages: 0,
            currentPage: 1
        } as IPaginationMeta,
        links: undefined as IPaginationLinks
    } as Pagination<Wine>;
    let mockSearch : SearchDto ={
        page:1   ,
        serial:'string'   ,
        type:WineTypeEnum.WHITE,   
        name:'string',
        country:'string',
        regions:'string',
        year:1999        
    }
    beforeEach(async () => {
        app = await Test.createTestingModule({
            providers:[
                WineRepository,SearchService
            ]
        }).compile()
        wineRepository = app.get<WineRepository>(WineRepository)
        searchService = app.get<SearchService>(SearchService)
    })
    it('Should return array data',async () => {
        jest.spyOn(wineRepository,'search').mockImplementation(()=>{
            return new Promise(resolve=>{
                return resolve(dataRes)
            })
        })
        let result = await searchService.search(mockSearch)
        expect(result).toEqual({
            items: [{
                wineId: 1,
                wineProducerSymbol: 'AAA',
                wineSerialSymbol: 'AAA',
                wineSerialNumber: 'AA0001',
                wineName: 'name',
                wineType: WineTypeEnum.WHITE,
                wineCountry: 'Thailand',
                wineRegions: 'test',
                wineDescription: 'test',
                wineYear: 1999,
                wineCount: 1,
                wineOwnerUserId: 1,
                wineStatus: true
              }],
            meta: {
                totalItems: 0,
                itemCount: 0,
                itemsPerPage: 15,
                totalPages: 0,
                currentPage: 1
            },
            links: undefined
        })
    })
})