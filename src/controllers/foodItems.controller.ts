import { foodItemsService } from '../services';
import { Request, Response } from 'express';

export const getFoodItemsCOntroller = (req: Request, res: Response) => foodItemsService.getFoodItems(req, res);
export const createFoodItemController = (req: Request, res: Response) => foodItemsService.createFoodItem(req, res);
