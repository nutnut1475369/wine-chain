    import { UserRoleEnum } from '@enums/user-role.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
    import {
    BaseEntity,
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    } from 'typeorm';
    import { Address } from './addresses.entity';
    import { Producer } from './producers.entity';
    import { Wine } from './wines.entity';

    @Index('fk_user_producer_id', ['userProducerId'], {})
    @Index('fk_user_type_id', ['userTypeId'], {})
    @Index('fk_user_address_id', ['userAddressId'], {})
    @Entity('users')
    export class User extends BaseEntity {
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
    userId: number;

    @Column('varchar', { name: 'user_name', length: 255 })
    userName: string;

    @Column('varchar', { name: 'user_lastname', length: 255 })
    userLastname: string;

    @Column('varchar', { name: 'user_email', length: 255 })
    userEmail: string;

    @Column('bigint', { name: 'user_producer_id' })
    userProducerId: number;

    @Column('bigint', { name: 'user_role_id' })
    userRoleId: UserRoleEnum;

    @Column('bigint', { name: 'user_type_id' })
    userTypeId: UserTypeEnum;

    @Column('bigint', { name: 'user_address_id' })
    userAddressId: number;

    @Column('varchar', { name: 'user_password' })
    userPassword: string;

    @Column('timestamp', {
        name: 'user_created_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('timestamp', {
        name: 'user_updated_at',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @OneToOne(
        () => Producer, 
        (producer: Producer) => producer.user
    )
    @JoinColumn([{ name: 'producer_id' }])
    ProducerId: Producer;

    @OneToOne(
        () => Address, 
        (address: Address) => address.user
    )
    @JoinColumn([{ name: 'address_id' }])
    AddressId: Address;

    @OneToMany(
        () => Wine,
        wine => wine.user
    )
    wines : Wine[]
}