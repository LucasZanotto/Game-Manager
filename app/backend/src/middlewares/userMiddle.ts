import { NextFunction, Request, Response } from 'express';

export default function userMiddle(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!password || password.length < 6) {
    res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
}
