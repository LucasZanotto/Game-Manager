import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService: MatchService) { }

  async findAllMatches(req: Request, res: Response) {
    const matches = await this.matchService.findAllMatches();
    return res.status(200).json(matches);
  }
}
