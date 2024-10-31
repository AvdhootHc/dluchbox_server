import { User } from '../entity/user.entity';
import { AppDataSource } from '../data-source';
import { CustomerReviews } from '../entity/customerReview.entity';
import { Request, Response } from 'express';

export class customerReviewService {
  static async createReview(req: Request, res: Response) {
    const { reviewContent } = req.body;
    const userId = req[' currentUser'].id;

    try {
      const customerReviewRepository = AppDataSource.getRepository(CustomerReviews);
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .where('user.id = :userID', { userID: userId })
        .getOne();

      if (!user) {
        return res.status(200).json({
          message: 'user not found',
        });
      }

      await customerReviewRepository
        .createQueryBuilder('customer_review')
        .insert()
        .values({
          user: user,
          reviewContent: reviewContent,
          rating: 4,
          created_by: user.id,
        })
        .execute();

      return res.status(200).json({
        message: 'food item created sucessfully ...',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'something went wrong while creating item !',
        error: error,
      });
    }
  }
}
