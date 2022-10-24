import { Request, Response } from 'express';
import LoginUserService from '../services/LoginUserService';

export default class LoginController {
  constructor(private loginService: LoginUserService) { }
  async findUser(req: Request, res: Response) {
    try {
      const token = await this.loginService.findUser(req.body);
      return res.status(200).json({ token });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
