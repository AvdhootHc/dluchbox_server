import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/user.entity';
import { encrypt } from '../utils/auth.helper';

export class AuthService {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const userRepository = AppDataSource.getRepository(User);

      // Fetch the user with related agent information if the user is an agent
      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await encrypt.comparepassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Please enter a valid password' });
      }

      const token = encrypt.generateToken({ id: user.id });

      const responseData: any = { message: 'Login successful', user, token };
      // if (user.role === 'agent') {
      //   responseData.agent = user.agent;
      // }

      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getProfile(req: Request, res: Response) {
    const { id } = req[' currentUser'];

    try {
      if (!req[' currentUser']) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: id },
      });

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      return res.status(200).json({ ...user, password: undefined });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong while getting user details',
      });
    }
  }

  static async signup(req: Request, res: Response) {
    const { email, password, role, firstName, lastName, phoneNumber } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }

    try {
      const userRepository = AppDataSource.getRepository(User);

      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists. Please login.' });
      }

      const encryptedPassword = await encrypt.encryptpass(password);
      const user = new User();
      user.email = email;
      user.password = encryptedPassword;
      user.role = role;
      user.name = firstName;
      user.lastname = lastName;
      user.contact_number = phoneNumber;

      await userRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ message: 'User created successfully', token, user });
    } catch (error) {
      console.error('Signup error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
