import { sign } from 'jsonwebtoken';
import IUser from '../entities/IUser';
import User from '../database/models/User';

const generateToken = (user: User): string => {
  const payload = { id: user.id, name: user.username };
  const token = sign(payload, 'SENHASUPERSECRETA');
  return token;
};

export default class LoginUserService {
  constructor(private userModel: typeof User) { }

  async create(user: IUser): Promise<string> {
    if (!user.email) {
      throw new Error('All fields must be filled');
    }
    if (!user.password) {
      throw new Error('All fields must be filled');
    }
    const newUser = await this.userModel.create(user);
    await this.userModel.findOne({ where: { email: user.email } });
    const token = generateToken(newUser);
    return token;
  }
}
