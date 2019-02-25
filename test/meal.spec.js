import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/index';
import { adminLogin, userLogin } from './data/authData';
import {
  newMeal,
  invalidMealName,
  invalidMealPrice,
  invalidMealQuantity
} from './data/mealData';

chai.use(chaiHttp);
const { expect } = chai;

let userToken, adminToken;

const route = '/api/v1/';

describe('Meal Endpoints', () => {
  before((done) => {
    chai.request(app)
      .post(`${route}auth/login`)
      .send(adminLogin)
      .end((err, res) => {
        adminToken = res.body.data.token;
        done(err);
      });
  });
  before((done) => {
    chai.request(app)
      .post(`${route}auth/login`)
      .send(userLogin)
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  describe('POST /', () => {
    it('should create a new meal', (done) => {
      chai.request(app)
        .post(`${route}meals`)
        .set('x-access-token', adminToken)
        .send(newMeal)
        .end((err, res) => {
          expect(res.body.message).eql('Meal created successfully');
          expect(res.status).to.equal(201);
          expect(res.body.statusText).eql('Created');
          done();
        });
    });
    it('should not create a new meal when name is missing', (done) => {
      chai.request(app)
        .post(`${route}meals`)
        .set('x-access-token', adminToken)
        .send(invalidMealName)
        .end((err, res) => {
          expect(res.body.message).eql('Name cannot be empty');
          expect(res.status).to.equal(400);
          expect(res.body.statusText).eql('Bad Request');
          done();
        });
    });
    it('should not create a new meal when price is missing', (done) => {
      chai.request(app)
        .post(`${route}meals`)
        .set('x-access-token', adminToken)
        .send(invalidMealPrice)
        .end((err, res) => {
          expect(res.body.message).eql('Price cannot be empty');
          expect(res.status).to.equal(400);
          expect(res.body.statusText).eql('Bad Request');
          done();
        });
    });
    it('should not create a new meal when quantity is missing', (done) => {
      chai.request(app)
        .post(`${route}meals`)
        .set('x-access-token', adminToken)
        .send(invalidMealQuantity)
        .end((err, res) => {
          expect(res.body.message).eql('Quantity cannot be empty');
          expect(res.status).to.equal(400);
          expect(res.body.statusText).eql('Bad Request');
          done();
        });
    });
    it('should not create a new meal when token is invalid', (done) => {
      chai.request(app)
        .post(`${route}meals`)
        .set('x-access-token', userToken)
        .send(invalidMealPrice)
        .end((err, res) => {
          expect(res.body.message).eql('Only admins and caterers can create meals');
          expect(res.status).to.equal(401);
          expect(res.body.statusText).eql('Unauthorized');
          done();
        });
    });
  });
});
