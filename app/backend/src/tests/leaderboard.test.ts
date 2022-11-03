
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import leaderboardHome from './mocks/leaderboardHomeMock';
import leaderboardAway from './mocks/leaderboardAwayMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota leaderboard', () => {
  describe('quando aparece todas as partidas jogadas em casa', () => {
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(leaderboardHome);
    })
  })

  describe('quando aparece todas as partidas jogadas fora de casa', () => {
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(leaderboardAway);
    })
  })
})