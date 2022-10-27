import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService) { }

  async findMatches(req: Request, res: Response) {
    if (req.query.inProgress) {
      const matches = await this.matchService.findProgressMatches(req.query.inProgress as string);

      return res.status(200).json(matches);
    }
    const matches = await this.matchService.findAllMatches();
    return res.status(200).json(matches);
  }

  async createMatches(req: Request, res: Response) {
    try {
      const newMatches = await this.matchService.createMatch(req.body);
      return res.status(201).json(newMatches);
    } catch (error: any) {
      return res.status(422).json({ message: error.message });
    }
  }

  async updateMatches(req: Request, res: Response) {
    await this.matchService.updateMatchProgress(req.params.id);
    return res.status(200).json({ message: 'Finished' });
  }

  async updateMatchesGoals(req: Request, res: Response) {
    const goals = await this
      .matchService.updateMatchGoals(req.params.id, req.body.homeTeamGoals, req.body.awayTeamGoals);
    return res.status(200).json(goals);
  }
}
