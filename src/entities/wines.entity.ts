import { WineTypeEnum } from '@enums/wine-type.enum';
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from './transformer/column-numeric.transformer';
import { User } from './users.entity';

@Index('fk_wine_owner_user_id',['wineOwnerUserId'],{})
@Entity("wines")
export class Wine extends BaseEntity {
    @Column({ 
        type: "bigint",
        name: "wine_id",
        primary: true,
		generated: 'increment',
        transformer: new ColumnNumericTransformer()
    })
    wineId : number
    
    @Column("varchar",{name : "wine_producer_symbol", length: 4})
    wineProducerSymbol : string

    @Column("varchar",{name : "wine_serial_symbol", length: 3})
    wineSerialSymbol : string
    
    @Column("varchar",{name : "wine_serial_number", length: 6})
    wineSerialNumber : string

    @Column("varchar",{name : "wine_name", length: 200})
    wineName : string
    
    @Column("varchar",{name : "wine_type", length: 200})
    wineType : WineTypeEnum
    
    @Column("varchar",{name : "wine_country", length: 200})
    wineCountry : string
    
    @Column("varchar",{name : "wine_regions", length: 200})
    wineRegions : string
    
    @Column("varchar",{name : "wine_description", length: 255})
    wineDescription : string
    
    @Column("bigint",{
        name : "wine_year",
        transformer: new ColumnNumericTransformer()
})
    wineYear : number
        
    @Column("bigint",{
        name : "wine_count",
        transformer: new ColumnNumericTransformer()
    })
    wineCount : number

    @Column("bigint",{
        name : "wine_owner_user_id",
        transformer: new ColumnNumericTransformer()
    })
    wineOwnerUserId : number

    @Column("boolean",{name : "wine_status"})
    wineStatus : boolean

    @ManyToOne(
        () => User,
        user => user.wines
    )
    @JoinColumn([{ name:'user_id', referencedColumnName : 'userId'}])
    user : User
    
}