import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Index('fk_wine_owner_user_id',['wineOwnerUserId'],{})
@Entity("wine")
export class Wine extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "wine_id" })
    wineId : number

    @Column("varchar",{name : "wine_serial_id", length: 6})
    wineSerialId : string
    
    @Column("varchar",{name : "wine_serial_symbol", length: 3})
    wineSerialSymbol : string
    
    @Column("varchar",{name : "wine_producer_symbol", length: 4})
    wineProducerSymbol : string
    
    @Column("bigint",{name : "wine_type"})
    wineType : number
    
    @Column("varchar",{name : "wine_country", length: 200})
    wineCountry : string
    
    @Column("varchar",{name : "wine_regions", length: 200})
    wineRegions : string
    
    @Column("varchar",{name : "wine_description", length: 255})
    wineDescription : string
    
    @Column("bigint",{name : "wine_year"})
    wineYear : number
    
    @Column("bigint",{name : "wine_count"})
    wineCount : number
    
    @Column("bigint",{name : "wine_owner_user_id"})
    wineOwnerUserId : number

    @Column("boolean",{name : "wine_status"})
    wineStatus : number

    @ManyToOne(
        () => User,
        user => user.wines
    )
    @JoinColumn([{ name:'user_id', referencedColumnName : 'userId'}])
    user : User
    
}