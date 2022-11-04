import { sign, SignOptions } from 'jsonwebtoken';
import User from '../database/models/User';

const generateToken = (user: User): string => {
  const payload = { id: user.id, name: user.username, role: user.role };
  const jwtCOnfig: SignOptions = {
    expiresIn: '20d',
  };
  const token = sign(payload, 'jwt_secret', jwtCOnfig);
  return token;
};

export default generateToken;
