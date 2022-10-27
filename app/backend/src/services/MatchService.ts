import Model from '../database/models';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

interface IMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

const leaderBoardScript = `select name,
totalVictories * 3 + totalDraws totalPoints,
totalVictories + totalDraws + totalLosses totalGames,
totalVictories,
totalDraws,
totalLosses,
goalsFavor,
goalsOwn,
goalsFavor - goalsOwn goalsBalance,
ROUND(
  ((totalVictories * 3 + totalDraws)/((totalVictories + totalDraws + totalLosses) * 3)) * 100,
   2) efficiency

from (select te.team_name name,
 sum(case when ma.home_team_goals > ma.away_team_goals then 1 else  0 end) totalVictories,
 sum(case when ma.home_team_goals = ma.away_team_goals then 1 else 0 end) totalDraws,
 sum(case when ma.home_team_goals < ma.away_team_goals then 1 else 0 end) totalLosses,
 sum(ma.home_team_goals) goalsFavor,
 sum(ma.away_team_goals) goalsOwn
 
from matches ma inner join
 teams te on ma.home_team = te.id where ma.in_progress = false group by name) as ba
group by ba.name
order by totalPoints DESC, goalsBalance DESC, totalVictories DESC, goalsFavor DESC;





`;

export default class MatchService {
  constructor(private matchModel = Match, private model = Model) { }

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

  async leaderBoard() {
    const [results] = await this.model.query(leaderBoardScript);
    return results;
  }
}
