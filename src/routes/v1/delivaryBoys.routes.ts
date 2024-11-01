import { delivaryBoySignInController, delivaryBoySignUpUserController } from '../../controllers';
import * as express from 'express';

const Router = express.Router();

// Router.get('/profile', authentification, authorization(['user', 'admin']), getProfileController);

Router.post('/signup', delivaryBoySignUpUserController);

Router.post('/login', delivaryBoySignInController);

export { Router as delivaryBoyRouter };
