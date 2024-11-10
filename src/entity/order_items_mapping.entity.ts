// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { MyOrders } from './myOrder.entity';
// import { FoodItems } from './foodItems.entity';

// @Entity('order_items_map')
// export class OrderItemsMap {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => MyOrders, (order) => order.orderItems, { onDelete: 'CASCADE' })
//   order: MyOrders;

//   @ManyToOne(() => FoodItems, { onDelete: 'CASCADE' })
//   food_item: FoodItems;

//   @Column('int')
//   quantity: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   price: number; // price per item at the time of order
// }
