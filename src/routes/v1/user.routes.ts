import * as express from 'express';
import { authentification } from '../../middlewares/authentification.middleware';

import { authorization } from '../../middlewares/authorization.middleware';
import { signInController, getProfileController, signUpUserController } from '../../controllers';
import { propertyFeature } from '../../middlewares/propertyFeature.middleware';
import { emailAuth } from '../../middlewares/emailAuth.middleware';

const Router = express.Router();

Router.get('/profile', authentification, getProfileController);

Router.get('/verify', emailAuth);

Router.post('/signup', signUpUserController);

Router.post('/login', signInController);

export { Router as userRouter };
