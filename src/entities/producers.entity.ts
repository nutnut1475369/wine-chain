import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('producer')
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'producer_id' })
  producerId: number;

  @Column('varchar', { name: 'producer_symbol', length: 4 })
  producerSymbol: string;

  @Column('varchar', { name: 'producer_serial_count' })
  producerSerialCount: number;

  @OneToOne(() => User, (user:User) => user.ProducerId)
  user: User;
}
