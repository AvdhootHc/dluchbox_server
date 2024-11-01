import { DeliveryBoy } from '../entity/deliveryBoy.entity';
import { AppDataSource } from '../data-source';

import { Request, Response } from 'express';
import { encrypt } from '../utils/auth.helper';

export class DelivaryBoysService {
  static async delivaryBoyLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const DelivaryRepository = AppDataSource.getRepository(DeliveryBoy);

      // Fetch the user with related agent information if the user is an agent
      const delivaryBoy = await DelivaryRepository.findOne({
        where: { email },
      });

      if (!delivaryBoy) {
        return res.status(404).json({ message: 'delivaryBoy not found' });
      }

      const isPasswordValid = await encrypt.comparepassword(delivaryBoy.password, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Please enter a valid password' });
      }

      const token = encrypt.generateToken({ id: delivaryBoy.id });

      const responseData: any = { message: 'Login successful', delivaryBoy, token };
      // if (user.role === 'agent') {
      //   responseData.agent = user.agent;
      // }

      return res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async delivaryBoySignup(req: Request, res: Response) {
    const { email, password, firstName, lastName, phoneNumber, adharNumber } = req.body;

    if (!email || !password || !adharNumber) {
      return res.status(400).json({ message: 'Email, password, AdharNumber and role are required' });
    }

    try {
      const DelivaryRepository = AppDataSource.getRepository(DeliveryBoy);

      const existingUser = await DelivaryRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists. Please login.' });
      }

      const encryptedPassword = await encrypt.encryptpass(password);
      const user = new DeliveryBoy();
      user.email = email;
      user.password = encryptedPassword;
      user.name = firstName;
      user.lastName = lastName;
      user.contact_number = parseInt(phoneNumber);
      user.aadhaar_number = adharNumber;

      await DelivaryRepository.save(user);

      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ message: 'Delivary Boy created successfully', token, user });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
