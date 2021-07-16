import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from './transformer/column-numeric.transformer';
import { User } from './users.entity';

@Entity("addresses")
export class Address extends BaseEntity {
    @Column({
        type: "bigint",
        name: "address_id",
        primary: true,
		generated: 'increment',
        transformer: new ColumnNumericTransformer()
    })
    addressId : number

    @Column("varchar",{name : "address_address", length: 255})
    addressAddress : string
    
    @Column("varchar",{name : "address_street_name", length: 255})
    addressStreetName : string
    
    @Column("varchar",{name : "address_state", length: 255})
    addressState : string
    
    @Column("varchar",{name : "address_postcode", length: 255})
    addressPostcode : string
    
    @Column("varchar",{name : "address_city", length: 255})
    addressCity : string
    
    @Column("varchar",{name : "address_country", length: 255})
    addressCountry : string

    @OneToOne(
        ()=>User,
        user => user.AddressId
    )
    user:User
}