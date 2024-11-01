import * as express from 'express';
import { userRouter } from './user.routes';
import { placeOrderRouter } from './placeOrder.routes';
import { foodItemsRouter } from './foodItems.routes';
import { customerReviewsRouter } from './customerReviews.routes';
import { delivaryBoyRouter } from './delivaryBoys.routes';

const router = express.Router();

router.use('/auth', userRouter);
router.use('/order', placeOrderRouter);
router.use('/foodItems', foodItemsRouter);
router.use('/customer-review', customerReviewsRouter);
router.use('/delivary-boys', delivaryBoyRouter);

export default router;
