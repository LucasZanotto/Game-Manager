import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import matchMock from './mocks/matchMock';
import matchInProgress from './mocks/matchInProgressMock';
import matchFinish from './mocks/matchFinishMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota para /matches', () => {
  describe('quando aparece todas as partidas', () => {
    beforeEach(() => sinon.stub(Match, 'findAll').resolves(matchMock as any))
    afterEach(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/matches')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(matchMock);
    })
  })

  describe('quando aparece apenas as partidas em andamento', () => {
    beforeEach(() => sinon.stub(Match, 'findAll').resolves(matchInProgress as any))
    afterEach(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(matchInProgress);
    })
  })

  describe('quando aparece apenas as partidas finalizadas', () => {
    beforeEach(() => sinon.stub(Match, 'findAll').resolves(matchFinish as any))
    afterEach(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(matchFinish);
    })
  })

  describe('quando uma partida é finalizada', () => {
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .patch('/matches/10/finish')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal({ "message": "Finished" });
    })
  })

  describe('quando uma partida é modificada', () => {
    beforeEach(() => sinon.stub(Match, 'update').resolves([1] as any))
    afterEach(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .patch('/matches/10')
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      })
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal([1]);
    })
  })
})