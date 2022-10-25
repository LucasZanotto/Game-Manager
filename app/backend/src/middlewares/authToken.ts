import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

// const { JWT_SECRET } = process.env;

export default function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = verify(token, 'senhaSecreta');
    req.body.user = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  next();
}
