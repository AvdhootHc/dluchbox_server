import { PlaceOrderService } from '../services';
import { Request, Response } from 'express';

export const placeOrderController = (req: Request, res: Response) => PlaceOrderService.placeOrder(req, res);
export const getMyOrdersController = (req: Request, res: Response) => PlaceOrderService.getMyOrders(req, res);
