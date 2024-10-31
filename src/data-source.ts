import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import * as dotenv from 'dotenv';
import { MyOrders } from './entity/myOrder.entity';
import { FoodItems } from './entity/foodItems.entity';
import { OrderItemsMap } from './entity/order_items_mapping.entity';
import { CustomerReviews } from './entity/customerReview.entity';

dotenv.config();

//const { DB_URL,  } = process.env;
//connect by port
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "test",
//     password: "test",
//     database: "test",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// })

//conection by host
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, MyOrders, FoodItems, OrderItemsMap, CustomerReviews],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
});
