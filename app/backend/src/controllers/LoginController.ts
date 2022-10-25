import { Request, Response } from 'express';
import LoginUserService from '../services/LoginUserService';

export default class LoginController {
  constructor(private loginService: LoginUserService) { }
  async findUser(req: Request, res: Response) {
    try {
      const token = await this.loginService.findUser(req.body);
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  static infoToken(req: Request, res: Response) {
    console.log(res.locals.user);

    const role = LoginUserService.infoToken(res.locals.user);
    return res.status(200).json({ role });
  }
}
