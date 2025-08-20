import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';

// Reusable async handler to wrap route functions
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const generateToken = (id: string): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30m' });
};

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Lütfən bütün sahələri doldurun' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Bu email ilə istifadəçi artıq mövcuddur' });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id.toString()),
    });
  } else {
    res.status(400).json({ message: 'Yanlış istifadəçi məlumatları' });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Lütfən bütün sahələri doldurun' });
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id.toString()),
    });
  } else {
    res.status(401).json({ message: 'Email və ya şifrə yanlışdır' });
  }
});