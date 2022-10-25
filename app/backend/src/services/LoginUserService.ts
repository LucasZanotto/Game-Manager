import { sign, SignOptions } from 'jsonwebtoken';
import bcrypt = require('bcryptjs');
import IUser from '../entities/IUser';
import User from '../database/models/User';

const generateToken = (user: User): string => {
  const payload = { id: user.id, name: user.username };
  const jwtCOnfig: SignOptions = {
    expiresIn: '20d',
  };
  const token = sign(payload, 'senhaSecreta', jwtCOnfig);
  return token;
};

export default class LoginUserService {
  constructor(private userModel: typeof User) { }

  async findUser(user: IUser): Promise<string> {
    // await this.userModel.create(user);
    const newUser = await this.userModel.findOne({
      where: { email: user.email } });
    if (!newUser) throw new Error('Incorrect email or password');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newUser.password, salt);
    if (!bcrypt.compareSync(user.password, hash)) throw new Error('Incorrect email or password');
    // console.log(bcrypt.compareSync(user.password, hash));
    const token = generateToken(newUser);
    return token;
  }
}
