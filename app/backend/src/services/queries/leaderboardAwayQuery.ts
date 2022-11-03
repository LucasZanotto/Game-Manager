const leaderBoardScriptAway = `select name,
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
 sum(case when ma.home_team_goals < ma.away_team_goals then 1 else  0 end) totalVictories,
 sum(case when ma.home_team_goals = ma.away_team_goals then 1 else 0 end) totalDraws,
 sum(case when ma.home_team_goals > ma.away_team_goals then 1 else 0 end) totalLosses,
 sum(ma.away_team_goals) goalsFavor,
 sum(ma.home_team_goals) goalsOwn
 
from matches ma inner join
 teams te on ma.away_team = te.id where ma.in_progress = false group by name) as ba
group by ba.name
order by totalPoints DESC, goalsBalance DESC, totalVictories DESC, goalsFavor DESC, goalsOwn ASC`;

export default leaderBoardScriptAway;
