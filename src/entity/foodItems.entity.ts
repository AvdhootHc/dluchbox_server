import { IFood_type, IItem_status, IMeal_type } from '../utils/data/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
// import { OrderItemsMap } from './order_items_mapping.entity';

@Entity({ name: 'food_items' })
export class FoodItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false, length: 250 })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'enum', enum: IFood_type, nullable: false })
  food_type: IFood_type;

  @Column({ type: 'enum', enum: IMeal_type, nullable: true })
  meal_type: IMeal_type;

  @Column({ type: 'enum', enum: IItem_status, default: IItem_status.Active, nullable: false })
  status: IItem_status;

  // @OneToMany(() => OrderItemsMap, (orderItem) => orderItem.food_item)
  // orderItems: OrderItemsMap[];

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

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
