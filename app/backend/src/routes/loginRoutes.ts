import { Router } from 'express';
import User from '../database/models/User';
import LoginUserService from '../services/LoginUserService';
import LoginController from '../controllers/LoginController';

const loginService = new LoginUserService(User);
const loginController = new LoginController(loginService);
const router = Router();

router.post('/login', (req, res) => loginController.create(req, res));

export default router;
