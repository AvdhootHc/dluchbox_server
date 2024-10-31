import { authentification } from '../../middlewares/authentification.middleware';
import { createFoodItemController, getFoodItemsCOntroller } from '../../controllers';
import * as express from 'express';

const Router = express.Router();

Router.get('/', getFoodItemsCOntroller);
Router.post('/', authentification, createFoodItemController);

export { Router as foodItemsRouter };
