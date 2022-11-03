import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/Team';
import mockTeam from './mocks/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

const time10 = {
	"id": 10,
	"teamName": "Minas Brasília"
};

describe('rota para os times', () => {
  describe('quando o id do time existe', () => {
    beforeEach(() => sinon.stub(Team, 'findOne').resolves(time10 as any))
    afterEach(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/teams/10')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(time10)
    })
  })

  describe('quando o "id" do time não existe', () => {
    it('deve retornar um status 401', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/teams/19')
      expect(hhtpResponse.status).to.equal(401);
      expect(hhtpResponse.body).to.deep.equal({ "message": "Time não existe" })
    })
  })

  describe('quando o tenta pegar todos os times', () => {
    beforeEach(() => sinon.stub(Team, 'findOne').resolves(mockTeam as any))
    afterEach(() => sinon.restore())
    it('deve retornar um status 200', async () => {
      const hhtpResponse = await chai
      .request(app)
      .get('/teams')
      expect(hhtpResponse.status).to.equal(200);
      expect(hhtpResponse.body).to.deep.equal(mockTeam);
    })
  })
})