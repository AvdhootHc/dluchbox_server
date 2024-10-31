import { Request, Response } from 'express';

import { AuthService } from '../services/index';

export const signInController = (req: Request, res: Response) => AuthService.login(req, res);
export const getProfileController = (req: Request, res: Response) => AuthService.getProfile(req, res);
export const signUpUserController = (req: Request, res: Response) => AuthService.signup(req, res);
