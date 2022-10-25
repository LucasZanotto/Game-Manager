import { sign } from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import IUser from '../entities/IUser';
import User from '../database/models/User';

const generateToken = (user: User): string => {
  const payload = { id: user.id, name: user.username };
  const token = sign(payload, 'SENHASUPERSECRETA');
  return token;
};

const verifyHashPass = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return bcrypt.compareSync(password, hash);
};

export default class LoginUserService {
  constructor(private userModel: typeof User) { }

  async findUser(user: IUser): Promise<string> {
    if (!user.email) {
      throw new Error('All fields must be filled');
    }
    if (!user.password) {
      throw new Error('All fields must be filled');
    }
    // await this.userModel.create(user);
    const newUser = await this.userModel.findOne({
      where: { email: user.email, password: user.password } });
    if (!newUser) throw new Error('Incorrect email or password');
    if (!verifyHashPass(newUser.password)) throw new Error('Incorrect email or password');
    const token = generateToken(newUser);
    return token;
  }
}
