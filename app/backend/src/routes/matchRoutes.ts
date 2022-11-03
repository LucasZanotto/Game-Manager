import { Router } from 'express';
import authToken from '../middlewares/authToken';
import MatchController from '../controllers/MatchController';
import Match from '../database/models/Match';
import MatchService from '../services/MatchService';
import MatchMiddle from '../middlewares/matchMiddle';

const matchService = new MatchService(Match);
const matchController = new MatchController(matchService);
const router = Router();

router.get(
  '/matches',
  (req, res) => matchController.findMatches(req, res),
);

router.post(
  '/matches',
  authToken,
  MatchMiddle,
  (req, res) => matchController.createMatches(req, res),
);

router.patch(
  '/matches/:id/finish',
  (req, res) => matchController.updateMatches(req, res),
);

router.patch(
  '/matches/:id',
  (req, res) => matchController.updateMatchesGoals(req, res),
);

export default router;
