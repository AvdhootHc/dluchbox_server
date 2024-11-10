import { IMeal_type, IUser_order } from '../utils/data/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Mealbox } from './mealBox.entity';

@Entity({ name: 'my_order' })
export class MyOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.my_orders, { onDelete: 'CASCADE' })
  user: User;

  // @Column({ type: 'uuid', nullable: true })
  // order: string;

  @Column({ type: 'enum', enum: IUser_order, default: IUser_order.PLACED, nullable: false })
  status: IUser_order;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total_price: number;

  @Column({ type: 'enum', enum: IMeal_type, nullable: false })
  meal_type: IMeal_type;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  order_delivered: Date;

  @Column({ nullable: false, length: 250 })
  note: string;

  @Column({ type: 'varchar', nullable: true })
  deliveryAdress: string;

  // @OneToMany(() => OrderItemsMap, (orderItem) => orderItem.order)
  // orderItems: OrderItemsMap[];

  @OneToMany(() => Mealbox, (mealBox) => mealBox.order)
  mealBoxes: Mealbox[];

  @Column({ type: 'boolean', nullable: true, default: false })
  is_deleted: boolean;

  @Column({ type: 'varchar', nullable: true })
  created_by: string;

  @Column({ type: 'varchar', nullable: true })
  updated_by: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
