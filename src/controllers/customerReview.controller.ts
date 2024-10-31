import { customerReviewService } from '../services/customerReviewService';
import { Request, Response } from 'express';

export const createCustomerReviewController = (req: Request, res: Response) => customerReviewService.createReview(req, res);
