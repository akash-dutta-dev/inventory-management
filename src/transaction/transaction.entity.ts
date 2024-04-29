import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'transaction'})
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: number;

  @Column({ type: 'enum', enum: ['add', 'deduct'] })
  transactionType: string;

  @Column()
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
  

