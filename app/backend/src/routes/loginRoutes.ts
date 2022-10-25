import { Router } from 'express';
import userMiddle from '../middlewares/userMiddle';
import loginMiddle from '../middlewares/loginMiddle';
import authPass from '../middlewares/authPass';
import User from '../database/models/User';
import LoginUserService from '../services/LoginUserService';
import LoginController from '../controllers/LoginController';
// import authToken from '../middlewares/authToken';

const loginService = new LoginUserService(User);
const loginController = new LoginController(loginService);
const router = Router();

router.post(
  '/login',
  // authToken,
  userMiddle,
  authPass,
  loginMiddle,
  (req, res) => loginController.findUser(req, res),
);

export default router;
