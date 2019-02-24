import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../src/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Root Endpoint', () => {
  describe('GET /', () => {
    it('should reach the root endpoint', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res.body.message).eql('Welcome to Book-A-Meal');
          expect(res.status).to.equal(200);
          expect(res.body.statusText).eql('Ok');
          done();
        });
    });
  });
});
