import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/User';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

const userPerfect = { username: "lucas", password: "123456", email: "lucas@email.com", role: "admin"};
const userOutMail = { username: 'any_user', password: '123456', role: 'admin'};
const userOutPass = { username: 'any_user', email: 'lucas@email.com', role: 'admin'};
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Imx1Y2FzIiwiaWF0IjoxNjY2NjQ2OTk0fQ.i1vgSchq_fd7XlfCDN2X6zzaelWIbXDnIH_NFd8tQzg";

describe('POST para /login', () => {
  describe('quando o campo "email" não é colocado', () => {
    it('deve retornar um status 400', async () => {
      const hhtpResponse = await chai
      .request(app)
      .post('/login')
      .send(userOutMail);
      expect(hhtpResponse.status).to.equal(400);
      expect(hhtpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
  })

  describe('quando o campo "password" não é colocado', () => {
    it('deve retornar um status 400', async () => {
      const hhtpResponse = await chai
      .request(app)
      .post('/login')
      .send(userOutPass);
      expect(hhtpResponse.status).to.equal(400);
      expect(hhtpResponse.body).to.deep.equal({ message: 'All fields must be filled' })
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    beforeEach(() => {
      sinon.stub(Model, 'findOne').resolves(userPerfect as User);
      sinon.stub(jwt, 'sign').callsFake(() => token)
    });
    afterEach(() => sinon.restore());
    it('deve retornar um token', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(userPerfect);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body.token).to.equal(token);
    })
  })

})