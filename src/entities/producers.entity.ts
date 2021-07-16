import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
} from 'typeorm';
import { ColumnNumericTransformer } from './transformer/column-numeric.transformer';
import { User } from './users.entity';

@Entity('producers')
export class Producer extends BaseEntity {
  @Column({ 
    type: 'bigint',
    name: 'producer_id',
    primary: true,
		generated: 'increment',
    transformer: new ColumnNumericTransformer()
  })
  producerId: number;

  @Column('varchar', { name: 'producer_symbol', length: 4 })
  producerSymbol: string;

  @Column('bigint', { name: 'producer_serial_count' })
  producerSerialCount: number;

  @OneToOne(() => User, (user:User) => user.ProducerId)
  user: User;
}
