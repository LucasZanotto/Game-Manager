import Team from '../database/models/Team';
import Match from '../database/models/Match';

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export default class MatchService {
  constructor(private matchModel: typeof Match) { }

  async findAllMatches() {
    const matches = await this.matchModel.findAll({
      // where: { inProgress: true },
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
    const newMatch = await this.matchModel.create({
      homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress: true });
    return newMatch;
  }

  async updateMatchProgress(id: string) {
    const updateMatch = await this.matchModel.update({ inProgress: false }, { where: { id } });
    return updateMatch;
  }
}
