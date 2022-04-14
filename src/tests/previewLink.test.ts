import request from 'supertest';
import { expect } from "chai";
import app from "../app";

describe('POST /previewLink', () => {
  let newUserId: string;
  before(function(done) {
    request(app)
      .post('/user')
      .send({
        "name": "TEST",
        "email": "test5@test.com",
        "phone_number": "12312312345"
      })
      .set('Content-Type', 'application/json')
      .end((_err, res) => {
        newUserId = res.body.id;
        done();
      })
  });

  it('It responds with json successfully', (done) => {
    request(app)
      .post('/previewLink')
      .send({
        "url": "https://donaldgmcneiljr1954.medium.com/will-we-do-better-next-time-f1f33efbc16e",
        "user_id": newUserId,
        "tags": [{
            "is_custom": false,
            "name": "tag1"
        }]
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(async (_err, res) => {
        expect(res.status).equal(200);
        expect(res.body.content_id).to.be.a('string');
        done();
      });
  });

  it('It fails with invalid user id', (done) => {
    request(app)
      .post('/previewLink')
      .send({
        "url": "https://donaldgmcneiljr1954.medium.com/will-we-do-better-next-time-f1f33efbc16e",
        "user_id": "invalid_id",
        "tags": [{
            "is_custom": false,
            "name": "tag1"
        }]
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(async (_err, res) => {
        expect(res.status).equal(404);
        done();
      });
  });

  after((done) => {
    request(app)
      .delete(`/user/${newUserId}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end(() => {
        done();
      });
  });
});
