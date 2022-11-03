import Model from '../database/models';
import leaderBoardScriptHome from './queries/leaderboardHomeQuery';
import leaderBoardScriptAway from './queries/leaderboardAwayQuery';

export default class MatchService {
  constructor(private model: typeof Model) { }

  async leaderBoardHome() {
    const [results] = await this.model.query(leaderBoardScriptHome);
    return results;
  }

  async leaderBoardAway() {
    const [results] = await this.model.query(leaderBoardScriptAway);
    return results;
  }
}
