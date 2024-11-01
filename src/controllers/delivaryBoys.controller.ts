import { DelivaryBoysService } from '../services/delivaryBoyService';
import { Request, Response } from 'express';

export const delivaryBoySignInController = (req: Request, res: Response) => DelivaryBoysService.delivaryBoyLogin(req, res);

// export const getProfileController = (req: Request, res: Response) => AuthService.getProfile(req, res);

export const delivaryBoySignUpUserController = (req: Request, res: Response) =>
  DelivaryBoysService.delivaryBoySignup(req, res);
