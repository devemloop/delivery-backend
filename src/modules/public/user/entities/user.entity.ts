import { Tenant } from '@modules/public/tenant/entities/tenant.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Tenant)
  @JoinColumn()
  tenant: Tenant;

  @Column()
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;
}
