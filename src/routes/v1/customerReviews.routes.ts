import { authentification } from '../../middlewares/authentification.middleware';
import { createCustomerReviewController } from '../../controllers';
import * as express from 'express';

const Router = express.Router();

Router.post('/', authentification, createCustomerReviewController);

export { Router as customerReviewsRouter };
