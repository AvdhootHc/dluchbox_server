import { authentification } from '../../middlewares/authentification.middleware';
import {
  createFoodItemController,
  getFoodIntemInformationController,
  getFoodItemsCOntroller,
  getMultipleFoodItemsDetailsController,
} from '../../controllers';
import * as express from 'express';

const Router = express.Router();

Router.get('/', getFoodItemsCOntroller);
Router.get('/:id/info', getFoodIntemInformationController);
Router.get('/details', getMultipleFoodItemsDetailsController);
Router.post('/', authentification, createFoodItemController);

export { Router as foodItemsRouter };
