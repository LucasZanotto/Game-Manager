import { Router } from 'express';
import MatchController from '../controllers/matchController';
import Match from '../database/models/Match';
import MatchService from '../services/MatchService';

const matchService = new MatchService(Match);
const matchController = new MatchController(matchService);
const router = Router();

router.get(
  '/matches',
  (req, res) => matchController.findMatches(req, res),
);

export default router;
