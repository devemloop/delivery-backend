import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  reference: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column()
  price: number;

  @Column({ default: true })
  active: boolean;
}
