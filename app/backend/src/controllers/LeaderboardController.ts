import { Request, Response } from 'express';
import MatchService from '../services/LeaderboardService';

export default class MatchController {
  constructor(private matchService: MatchService) { }

  async createLeaderBoardHome(req: Request, res: Response) {
    const matches = await this.matchService.leaderBoardHome();

    return res.status(200).json(matches);
  }

  async createLeaderBoardAway(req: Request, res: Response) {
    const matches = await this.matchService.leaderBoardAway();

    return res.status(200).json(matches);
  }
}
