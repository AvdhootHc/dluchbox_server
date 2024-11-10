import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { MyOrders } from './myOrder.entity';
import { CustomerReviews } from './customerReview.entity';
import { Mealbox } from './mealBox.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ nullable: true, type: 'numeric', precision: 10 })
  contact_number: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ default: false })
  is_email_verified: boolean;

  @Column({ default: false })
  is_contact_number_verified: boolean;

  @Column({ default: false })
  initial_logged_in: boolean;

  @OneToMany(() => MyOrders, (order) => order.user)
  my_orders: MyOrders[];

  @OneToMany(() => Mealbox, (mealBox) => mealBox.user)
  mealBoxes: Mealbox[];

  @OneToMany(() => CustomerReviews, (review) => review.user)
  review: CustomerReviews[];

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
