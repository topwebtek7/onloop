import request from 'supertest';
import { expect } from "chai";
import app from "../app";

describe("Users CRUD test", () => {
  let newUserId: string;

  describe('POST /user', () => {
    it('responds with json', (done) => {
      request(app)
        .post('/user')
        .send({
          "name": "TEST",
          "email": "test@test.com",
          "phone_number": "123123123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((_err, res) => {
          expect(res.status).equal(201);
          expect(res.body.id).to.be.a('string');
          newUserId = res.body.id;
          done();
        });
    });
  });

  describe('GET /user', () => {
    it('responds with json', (done) => {
      request(app)
        .get(`/user/${newUserId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((_err, res) => {
          expect(res.status).equal(200);
          done();
        });
    });
  });

  describe('PUT /user', () => {
    it('responds with json', (done) => {
      request(app)
        .put(`/user/${newUserId}`)
        .send({
          "name": "TEST1",
          "email": "test1@test.com",
          "phone_number": "1231231231",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((_err, res) => {
          expect(res.status).equal(200);
          done();
        });
    });
  });

  describe('DELETE /user', () => {
    it('responds with json', (done) => {
      request(app)
        .delete(`/user/${newUserId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((_err, res) => {
          expect(res.status).equal(200);
          done();
        });
    });
  });
});
