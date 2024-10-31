import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { encrypt } from '../utils/auth.helper';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export const emailAuth = async (req: Request, res: Response): Promise<any> => {
  const { token } = req.query;
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const { id }: any = await jwt.verify(token as string, process.env.JWT_SECRET_VERIFY);
    if (id) {
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      } else {
        user.is_email_verified = true;

        await userRepository.save(user);
      }

      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ message: 'Login successful', user, token });
    }
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
