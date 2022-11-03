import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import Model from '../database/models/index';
import LeaderboardService from '../services/LeaderboardService';

const leaderboardService = new LeaderboardService(Model);
const matchController = new LeaderboardController(leaderboardService);
const router = Router();

router.get(
  '/leaderboard/home',
  (req, res) => matchController.createLeaderBoardHome(req, res),
);

router.get(
  '/leaderboard/away',
  (req, res) => matchController.createLeaderBoardAway(req, res),
);

export default router;
