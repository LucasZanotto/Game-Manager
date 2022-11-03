import ITeam from '../entities/ITeam';
import Team from '../database/models/Team';

export default class TeamService {
  constructor(private teamModel: typeof Team) { }

  async findAllTeams(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async findIdTeams(id: string): Promise<ITeam | null> {
    const teamId = await this.teamModel.findOne({
      where: { id },
    });
    if (Number(id) > 16) throw new Error('Time não existe');
    return teamId;
  }
}
