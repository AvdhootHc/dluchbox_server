import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MyOrders } from './myOrder.entity';

@Entity({ name: 'delivery_boys' })
export class DeliveryBoy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ nullable: false, type: 'numeric', precision: 10 })
  contact_number: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true, length: 12 })
  aadhaar_number: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // @OneToMany(() => MyOrders, (order) => order.delivery_boy)
  // orders: MyOrders[];

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'uuid', nullable: true })
  created_by: string;

  @Column({ type: 'uuid', nullable: true })
  updated_by: string;
}
