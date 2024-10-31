import * as express from 'express';
import v1routes from './v1/index';

const router = express.Router();

// router.use('/auth', userRouter);
router.use('/v1', v1routes);
// router.use('/tour', tourRouter);
// router.use('/agent', agentroutes);

export default router;
