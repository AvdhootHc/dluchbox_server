import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { MyOrders } from '../entity/myOrder.entity';
import { IUser_order } from '../utils/data/enums';
import { Mealbox } from '../entity/mealBox.entity';

export class PlaceOrderService {
  static async placeOrder(req: Request, res: Response) {
    const userId = req[' currentUser'].id;
    const { orderType, mealBoxes, totalPrice, note, deliveryAddress } = req.body;

    if (!orderType || !mealBoxes || !totalPrice) {
      return res.status(400).json({
        message: 'Wrong input data for order place',
      });
    }

    const orderRepo = AppDataSource.getRepository(MyOrders);
    const mealBoxRepo = AppDataSource.getRepository(Mealbox);

    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const newOrder = await orderRepo
        .createQueryBuilder()
        .insert()
        .into(MyOrders)
        .values({
          user: user,
          meal_type: orderType,
          total_price: totalPrice,
          status: IUser_order.PLACED,
          note: note,
          deliveryAdress: deliveryAddress,
        })
        .returning('*')
        .execute();

      const savedOrder = newOrder?.raw[0];

      for (const box of mealBoxes) {
        const { mealType, sabjiId1, sabjiId2, sweetId, isDalRice, totalChapati } = box;

        await mealBoxRepo
          .createQueryBuilder()
          .insert()
          .into(Mealbox)
          .values({
            user: user,
            mealType: mealType,
            sabjiId_1: sabjiId1,
            sabjiId_2: sabjiId2,
            sweetId: sweetId,
            dalRice: isDalRice,
            chapati: totalChapati,
            order: savedOrder,
          })
          .execute();
      }

      res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  }

  static async getMyOrders(req: Request, res: Response) {
    const userId = req[' currentUser'].id;

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

      // const orders = await AppDataSource.getRepository(MyOrders)
      //   .createQueryBuilder('my_orders')
      //   .leftJoinAndSelect('my_orders.orderItems', 'orderItems')
      //   .leftJoinAndSelect('orderItems.food_item', 'food_item')
      //   .where('my_orders.user = :UserId', { UserId: user.id })
      //   .getMany();

      const orders = await AppDataSource.getRepository(MyOrders)
        .createQueryBuilder('myOrders')
        .leftJoinAndSelect('myOrders.mealBoxes', 'mealBoxes') // Left join with mealBoxes
        .where('myOrders.userId = :userId', { userId }) // Ensure we get orders for the current user
        .orderBy('myOrders.createdAt', 'DESC') // Optional: order by creation date
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
//   const { foodItems, mealType, note, delivaryAdress } = req.body;

//   const userId = req[' currentUser'].id;

//   try {
//     const user = await AppDataSource.getRepository(User)
//       .createQueryBuilder('user')
//       .where('user.id = :userId', { userId })
//       .getOne();

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     let total_price = 0;
//     const orderItemsData: Partial<OrderItemsMap>[] = [];

//     for (const item of foodItems) {
//       const foodItem = await AppDataSource.getRepository(FoodItems)
//         .createQueryBuilder('food_item')
//         .where('food_item.id = :foodItemId', { foodItemId: item.foodItemId })
//         .getOne();

//       if (!foodItem) {
//         return res.status(404).json({ message: `Food item with ID ${item.foodItemId} not found` });
//       }

//       total_price += foodItem.price * item.quantity;

//       orderItemsData.push({
//         food_item: foodItem,
//         quantity: item.quantity,
//         price: foodItem.price,
//       });
//     }

//     const order = new MyOrders();
//     order.user = user;
//     order.total_price = total_price;
//     order.status = IUser_order.PLACED;
//     order.meal_type = mealType;
//     order.note = note;
//     order.deliveryAdress = delivaryAdress;

//     const savedOrder = await AppDataSource.getRepository(MyOrders)
//       .createQueryBuilder()
//       .insert()
//       .into(MyOrders)
//       .values(order)
//       .returning('*')
//       .execute();

//     const orderId = savedOrder.raw[0].id;

//     for (const itemData of orderItemsData) {
//       await AppDataSource.getRepository(OrderItemsMap)
//         .createQueryBuilder()
//         .insert()
//         .into(OrderItemsMap)
//         .values({
//           order: { id: orderId },
//           food_item: itemData.food_item,
//           quantity: itemData.quantity,
//           price: itemData.price,
//         })
//         .execute();
//     }

//     const completeOrder = await AppDataSource.getRepository(MyOrders)
//       .createQueryBuilder('order')
//       .leftJoinAndSelect('order.orderItems', 'orderItems')
//       .leftJoinAndSelect('orderItems.food_item', 'food_item')
//       .where('order.id = :orderId', { orderId: orderId })
//       .getOne();

//     return res.status(201).json({ message: 'Order created successfully', order: completeOrder });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error', error });
//   }
// }

// static async placeOrder(req: Request, res: Response) {
//   const userId = req[' currentUser'].id;
//   const { orderType, mealBoxes, totalPrice, note, delivaryAdress } = req.body;

//   if (!orderType || !mealBoxes || !totalPrice) {
//     return res.status(404).json({
//       message: 'wrong input data for order place',
//     });
//   }

//   const orderRepo = AppDataSource.getRepository(MyOrders);
//   const mealBoxRepo = AppDataSource.getRepository(Mealbox);

//   let total_price = totalPrice;

//   try {
//     const user = await AppDataSource.getRepository(User)
//       .createQueryBuilder('user')
//       .where('user.id = :userId', { userId })
//       .getOne();

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const newOrder = new MyOrders();
//     newOrder.user = user;
//     newOrder.meal_type = orderType;
//     newOrder.total_price = total_price;
//     newOrder.status = IUser_order.PLACED;
//     newOrder.note = note;
//     newOrder.deliveryAdress = delivaryAdress;

//     await orderRepo.save(newOrder);

//     for (const box of mealBoxes) {
//       const { mealType, sabjiId1, sabjiId2, sweetId, isDalRice, totalChapati } = box;

//       // Create a new MealBox and associate it with the order
//       const mealBox = new Mealbox();
//       mealBox.user = user;
//       mealBox.mealType = mealType;
//       mealBox.sabjiId_1 = sabjiId1;
//       mealBox.sabjiId_2 = sabjiId2;
//       mealBox.sweetId = sweetId;
//       mealBox.dalRice = isDalRice;
//       mealBox.chapati = totalChapati;
//       mealBox.order = newOrder;

//       await mealBoxRepo.save(mealBox);
//     }

//     // const getOrder = await orderRepo
//     //   .createQueryBuilder('my_orders')
//     //   .leftJoinAndSelect('my_orders.mealBoxes', 'mealBoxes')
//     //   .where('my_orders.id = ')
//     //   .getOne();

//     res.status(201).json({ message: 'Order placed successfully', order: newOrder });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error', error });
//   }
// }
