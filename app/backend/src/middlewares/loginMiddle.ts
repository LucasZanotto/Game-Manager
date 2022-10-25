import { NextFunction, Request, Response } from 'express';

export default function loginMiddle(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  // const emailVerify = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  // if (!emailVerify.test(email)) {
  //   return res.status(401).json({ message: 'Incorrect email or password' });
  // }
  next();
}
