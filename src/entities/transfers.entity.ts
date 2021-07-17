import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Index('fk_transfer_user_id_req',['transferUserIdReq'],{})
@Index('fk_transfer_user_id_tar',['transferUserIdTar'],{})
@Entity("transfers")
export class Transfer extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "bigint", name: "transfer_id" })
    transferId : number

    @Column("varchar",{name : "transfer_user_id_req", length: 255})
    transferUserIdReq : number
    
    @Column("varchar",{name : "transfer_user_id_tar", length: 255})
    transferUserIdTar : number
    
    @Column("varchar",{name : "transfer_wine_id", length: 255})
    transferWineId : number
    
    @Column("timestamp",{name : "transfer_datetime"})
    transferDatetime : Date

}