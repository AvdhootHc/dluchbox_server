import { placeOrderController } from '../../controllers';
import * as express from 'express';
import { authentification } from '../../middlewares/authentification.middleware';
import { foodItemsRouter } from './foodItems.routes';

const Router = express.Router();

Router.post('/place-order', authentification, placeOrderController);

export { Router as placeOrderRouter };
