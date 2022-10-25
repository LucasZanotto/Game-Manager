import ITeam from '../entities/ITeam';
import Team from '../database/models/Team';

export default class TeamService {
  constructor(private teamModel: typeof Team) { }

  async findAllTeams(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  async findIdTeams(id: string): Promise<ITeam> {
    const teamId = await this.teamModel.findOne({
      where: { id },
    });
    if (!teamId) throw new Error('Time não existe');
    return teamId;
  }
}
