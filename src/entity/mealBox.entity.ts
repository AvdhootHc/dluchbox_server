import { IFood_type, IMeal_type, IUser_order } from '../utils/data/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { MyOrders } from './myOrder.entity';

@Entity({ name: 'meal_box' })
export class Mealbox {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: IFood_type })
  mealType: IFood_type;

  @Column({ type: 'varchar', nullable: false })
  sabjiId_1: string;

  @Column({ type: 'varchar', nullable: false })
  sabjiId_2: string;

  @Column({ type: 'varchar', nullable: false })
  sweetId: string;

  @Column({ default: true, nullable: false })
  dalRice: boolean;

  @Column({ type: 'int', nullable: false })
  chapati: number;

  @ManyToOne(() => User, (user) => user.mealBoxes)
  user: User;

  @ManyToOne(() => MyOrders, (order) => order.mealBoxes)
  order: MyOrders;
}
