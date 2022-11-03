import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

const userPerfect = { email: "admin@admin.com", password: "secret_admin" };
const userOutMail = { password: "secret_admin" };
const userOutPass = { email: "admin@admin.com" };

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
    it('deve retornar um token', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(userPerfect);
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body.token).to.be.a('string');
      expect(httpResponse.body).to.have.key('token');
    })
  })

})