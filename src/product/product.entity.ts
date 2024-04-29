import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  currentQuantity: number;

  @Column()
  maximumQuantity: number;

  @Column({ default: 1 }) 
  version: number;
}
