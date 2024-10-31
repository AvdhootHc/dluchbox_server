import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { MyOrders } from './myOrder.entity';
import { User } from './user.entity';

@Entity({ name: 'customer_reviews' })
export class CustomerReviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.review, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'varchar', nullable: false })
  reviewContent: string;

  @Column({ type: 'int', width: 1 })
  rating: number;

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
