import { sign, SignOptions } from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import IUser from '../entities/IUser';
import User from '../database/models/User';
import userLocal from '../entities/IUserLocal';

const generateToken = (user: User): string => {
  const payload = { id: user.id, name: user.username, role: user.role };
  const jwtCOnfig: SignOptions = {
    expiresIn: '20d',
  };
  const token = sign(payload, 'jwt_secret', jwtCOnfig);
  return token;
};

export default class LoginUserService {
  constructor(private userModel: typeof User) { }

  async findUser(user: IUser): Promise<string> {
    const newUser = await this.userModel.findOne({
      where: { email: user.email } });
    if (!newUser) throw new Error('Incorrect email or password');
    if (!bcrypt.compareSync(
      user.password,
      newUser.password,
    )) throw new Error('Incorrect email or password');
    const token = generateToken(newUser);
    return token;
  }

  static infoToken(token: userLocal) {
    const { role } = token;
    if (role === 'admin') return 'admin';
    return 'user';
  }
}
