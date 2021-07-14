import { UserTypeEnum } from 'src/enums/user-type.enum';
import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';


@Entity("type")
export class Type extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "type_id" })
    typeId : number

    @Column("bigint",{name : "type_type"})
    typeType : UserTypeEnum

    @OneToMany(
        () => User,
        user => user.TypeId
    )
    users:User[]
}