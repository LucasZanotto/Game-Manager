import { Router } from 'express';
import Team from '../database/models/Team';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';

const teamService = new TeamService(Team);
const teamController = new TeamController(teamService);
const router = Router();

router.get(
  '/teams',
  (req, res) => teamController.findAllTeams(req, res),
);

router.get(
  '/teams/:id',
  (req, res) => teamController.findIdTeams(req, res),
);

export default router;
