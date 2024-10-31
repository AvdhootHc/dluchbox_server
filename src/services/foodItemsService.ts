import { AppDataSource } from '../data-source';
import { FoodItems } from '../entity/foodItems.entity';
import { IItem_status } from '../utils/data/enums';
import { Request, Response } from 'express';
import { SelectQueryBuilder } from 'typeorm';

export class foodItemsService {
  static async getFoodItems(req: Request, res: Response) {
    const { top, skip, search, filter } = req.query;

    let skipcount = skip ? parseInt(skip as string) : 0;
    let topcount = parseInt(top as string) || 5;

    try {
      let queryBuilder: SelectQueryBuilder<FoodItems> = AppDataSource.getRepository(FoodItems)
        .createQueryBuilder('food_items')
        .andWhere('food_items.status = :mainStatus', { mainStatus: IItem_status.Active });

      queryBuilder = queryBuilder.skip(skipcount).take(topcount);

      const totalCountQuery = queryBuilder.clone();
      const count = await totalCountQuery.getCount();
      const foodItems = await queryBuilder.getMany();

      return res.status(200).json({
        message: 'food items fetch sucessfully',
        foodItems: foodItems,
      });
    } catch (error) {
      return res.status(200).json({
        message: 'something went wrong while getting food items',
      });
    }
  }

  static async createFoodItem(req: Request, res: Response) {
    const { name, description, itemType, price } = req.body;
    const userId = req[' currentUser'].id;

    try {
      const itemRepository = AppDataSource.getRepository(FoodItems);

      await itemRepository
        .createQueryBuilder('food_item')
        .insert()
        .values({
          name: name,
          description: description,
          food_type: itemType,
          price: price,
        })
        .execute();

      return res.status(200).json({
        message: 'food item created sucessfully ...',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'something went wrong while creating item !',
        error: error,
      });
    }
  }
}
