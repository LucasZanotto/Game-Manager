import Team from '../database/models/Team';
import Match from '../database/models/Match';

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
}
