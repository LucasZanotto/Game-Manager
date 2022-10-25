import bcrypt = require('bcryptjs');
import { NextFunction, Request, Response } from 'express';

const verifyHashPass = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return bcrypt.compareSync(password, hash);
};

export default function authPass(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;
  // console.log(verifyHashPass(password));
  if (!verifyHashPass(password)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
}
