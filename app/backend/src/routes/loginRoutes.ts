import { Router } from 'express';
import authToken from '../middlewares/authToken';
import userMiddle from '../middlewares/userMiddle';
import loginMiddle from '../middlewares/loginMiddle';
import User from '../database/models/User';
import LoginUserService from '../services/LoginUserService';
import LoginController from '../controllers/LoginController';

const loginService = new LoginUserService(User);
const loginController = new LoginController(loginService);
const router = Router();

router.post(
  '/login',
  userMiddle,
  loginMiddle,
  (req, res) => loginController.findUser(req, res),
);

router.get(
  '/login/validate',
  authToken,
  (req, res) => LoginController.infoToken(req, res),
);

export default router;
