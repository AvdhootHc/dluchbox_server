import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { OrderItemsMap } from '../entity/order_items_mapping.entity';
import { FoodItems } from '../entity/foodItems.entity';
import { MyOrders } from '../entity/myOrder.entity';
import { IUser_order } from '../utils/data/enums';

export class PlaceOrderService {
  static async placeOrder(req: Request, res: Response) {
    const { foodItems, mealType, note } = req.body;

    const userId = req[' currentUser'].id;

    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      let total_price = 0;
      const orderItemsData: Partial<OrderItemsMap>[] = [];

      for (const item of foodItems) {
        const foodItem = await AppDataSource.getRepository(FoodItems)
          .createQueryBuilder('food_item')
          .where('food_item.id = :foodItemId', { foodItemId: item.foodItemId })
          .getOne();

        if (!foodItem) {
          return res.status(404).json({ message: `Food item with ID ${item.foodItemId} not found` });
        }

        total_price += foodItem.price * item.quantity;

        orderItemsData.push({
          food_item: foodItem,
          quantity: item.quantity,
          price: foodItem.price,
        });
      }

      const order = new MyOrders();
      order.user = user;
      order.total_price = total_price;
      order.status = IUser_order.PLACED;
      order.meal_type = mealType;
      order.note = note;

      const savedOrder = await AppDataSource.getRepository(MyOrders)
        .createQueryBuilder()
        .insert()
        .into(MyOrders)
        .values(order)
        .returning('*')
        .execute();

      const orderId = savedOrder.raw[0].id;

      for (const itemData of orderItemsData) {
        await AppDataSource.getRepository(OrderItemsMap)
          .createQueryBuilder()
          .insert()
          .into(OrderItemsMap)
          .values({
            order: { id: orderId },
            food_item: itemData.food_item,
            quantity: itemData.quantity,
            price: itemData.price,
          })
          .execute();
      }

      const completeOrder = await AppDataSource.getRepository(MyOrders)
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.orderItems', 'orderItems')
        .leftJoinAndSelect('orderItems.food_item', 'food_item')
        .where('order.id = :orderId', { orderId: orderId })
        .getOne();

      return res.status(201).json({ message: 'Order created successfully', order: completeOrder });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  static async getMyOrders(req: Request, res: Response) {
    const userId = req[' currentUser'].id;

    console.log(userId);

    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: 'User not found!',
        });
      }

      const orders = await AppDataSource.getRepository(MyOrders)
        .createQueryBuilder('my_orders')
        .leftJoinAndSelect('my_orders.orderItems', 'orderItems')
        .leftJoinAndSelect('orderItems.food_item', 'food_item')
        .where('my_orders.user = :UserId', { UserId: user.id })
        .getMany();

      return res.status(200).json({
        message: 'Orders fetch sucesfully',
        data: orders,
      });
    } catch (error) {
      return res.status(200).json({
        message: 'Something went wrong while getting order details',
      });
    }
  }
}

// static async placeOrder(req: Request, res: Response) {
//   const { userId, foodItems, mealType, note } = req.body;
//   try {
//     const userRepository = AppDataSource.getRepository(User);
//     const foodItemRepository = AppDataSource.getRepository(FoodItems);
//     const orderRepository = AppDataSource.getRepository(MyOrders);
//     const orderItemsMapRepository = AppDataSource.getRepository(OrderItemsMap);
//     const user = await userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     let total_price = 0;
//     const orderItemsData: OrderItemsMap[] = [];
//     for (const item of foodItems) {
//       const foodItem = await foodItemRepository.findOne({ where: { id: item.foodItemId } });
//       if (!foodItem) {
//         return res.status(404).json({ message: `Food item with ID ${item.foodItemId} not found` });
//       }
//       total_price += foodItem.price * item.quantity;
//       const orderItem = new OrderItemsMap();
//       orderItem.food_item = foodItem;
//       orderItem.quantity = item.quantity;
//       orderItem.price = foodItem.price;
//       orderItemsData.push(orderItem);
//     }
//     const order = new MyOrders();
//     order.user = user;
//     order.total_price = total_price;
//     order.status = IUser_order.PLACED;
//     order.meal_type = mealType;
//     order.note = note;
//     const savedOrder = await orderRepository.save(order);
//     for (const orderItem of orderItemsData) {
//       orderItem.order = savedOrder;
//       await orderItemsMapRepository.save(orderItem);
//     }
//     const completeOrder = await orderRepository.findOne({
//       where: { id: savedOrder.id },
//       relations: ['orderItems', 'orderItems.food_item'],
//     });
//     return res.status(201).json({ message: 'Order created successfully', order: completeOrder });
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error', error });
//   }
// }
