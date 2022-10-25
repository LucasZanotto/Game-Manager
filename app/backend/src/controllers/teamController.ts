import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService: TeamService) { }
  async findAllTeams(req: Request, res: Response) {
    try {
      const teams = await this.teamService.findAllTeams();
      return res.status(200).json(teams);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async findIdTeams(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const team = await this.teamService.findIdTeams(id);
      return res.status(200).json(team);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
