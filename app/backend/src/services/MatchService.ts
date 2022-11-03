import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../entities/IMatch';

export default class MatchService {
  constructor(private matchModel: typeof Match) { }

  async findAllMatches() {
    const matches = await this.matchModel.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    return matches;
  }

  async findProgressMatches(progress: string) {
    const boleano = progress === 'true';
    console.log(boleano);
    const matches = await this.matchModel.findAll({
      where: { inProgress: boleano },
      include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] },
      },
      {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    return matches;
  }

  async createMatch(match: IMatch) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = match;
    if (homeTeam === awayTeam) {
      throw new Error(
        'It is not possible to create a match with two equal teams',
      );
    }
    const newMatch = await this.matchModel.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });
    return newMatch;
  }

  async updateMatchProgress(id: string) {
    const updateMatch = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return updateMatch;
  }

  async updateMatchGoals(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    const updateMatch = await this.matchModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updateMatch;
  }
}
