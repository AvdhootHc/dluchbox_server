import { getMyOrdersController, placeOrderController } from '../../controllers';
import * as express from 'express';
import { authentification } from '../../middlewares/authentification.middleware';

const Router = express.Router();

Router.get('/', authentification, getMyOrdersController);
Router.post('/place-order', authentification, placeOrderController);

export { Router as placeOrderRouter };
