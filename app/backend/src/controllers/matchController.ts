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
    const newMatches = await this.matchService.createMatch(req.body);
    return res.status(200).json(newMatches);
  }
}
