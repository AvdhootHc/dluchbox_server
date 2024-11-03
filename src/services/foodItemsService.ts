import { AppDataSource } from '../data-source';
import { FoodItems } from '../entity/foodItems.entity';
import { IFood_type, IItem_status } from '../utils/data/enums';
import { Request, Response } from 'express';
import { SelectQueryBuilder } from 'typeorm';

export class foodItemsService {
  static async getFoodItems(req: Request, res: Response) {
    const { top, skip, search, filter } = req.query;
    var mainFilter = '';

    if (filter == 'Veg') {
      mainFilter = IFood_type.Veg;
    } else if (filter == 'Non-veg') {
      mainFilter = IFood_type.Nonveg;
    } else {
      mainFilter = '';
    }

    let skipcount = skip ? parseInt(skip as string) : 0;
    let topcount = parseInt(top as string) || 5;

    try {
      let queryBuilder: SelectQueryBuilder<FoodItems> = AppDataSource.getRepository(FoodItems)
        .createQueryBuilder('food_items')
        .andWhere('food_items.status = :mainStatus', { mainStatus: IItem_status.Active });

      if (mainFilter) {
        queryBuilder = queryBuilder.andWhere('food_items.food_type = :foodType', { foodType: mainFilter });
      }

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
    const { name, description, itemType, price, mealType } = req.body;
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
          meal_type: mealType,
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

  static async getFoodIntemInformation(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const foodItem = await AppDataSource.getRepository(FoodItems)
        .createQueryBuilder('food_item')
        .where('food_item.id =  :itemId', { itemId: id })
        .getOne();

      if (!foodItem) {
        return res.status(404).json({
          message: 'Food item not found!',
        });
      }

      return res.status(200).json({
        message: 'Food item fetch sucessfully',
        data: foodItem,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'something went wrong while getting Food item Info',
      });
    }
  }

  static async getMultipleFoodItemsDetails(req: Request, res: Response) {
    const { ids } = req.query;

    if (!ids) {
      return res.status(404).json({
        message: "Please provide food items Id's",
      });
    }

    const uuids = (ids as string).split(',');

    try {
      const foodItems = await AppDataSource.getRepository(FoodItems)
        .createQueryBuilder('food_item')
        .where('food_item.id IN (:...uuids)', { uuids })
        .getMany();

      if (!foodItems) {
        return res.status(404).json({
          message: 'found items not found',
        });
      }

      return res.status(200).json({
        message: 'food items details fetch sucessfully',
        data: foodItems,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong while getting id details',
      });
    }
  }
}
