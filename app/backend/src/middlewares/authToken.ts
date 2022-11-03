import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export default function authToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  try {
    const payload = verify(token, 'jwt_secret');
    res.locals.user = payload;
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
}
