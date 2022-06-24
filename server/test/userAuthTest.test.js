import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import expect from 'expect';
import jwt from 'jsonwebtoken';

import app from '../../new_server/server.js';
import models from '../../new_server/models/index.js';
import userSeeder from '../../new_server/seeders/userSeeder.js';

dotenv.config();

const {
  validRegisterDetails,
  invalidUsernameMin5,
  noFullName,
  signUp,
  invalidLoginDetails,
  missingPassword,
  login
} = userSeeder;

const server = supertest.agent(app);
const token = process.env.testToken;

before((done) => {
  models.sequelize.sync({ force: true }).then(() => {
    done(null);
  }).catch((errors) => {
    done(errors);
  });
});

describe('User Api: ', () => {
  it('should return valid HTML and 200 Response Code', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(validRegisterDetails)
      .expect(201)
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        res.status.should.equal(201);
        done();
      });
  });

  it('should throw error if username is less than 5 characters', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidUsernameMin5)
      .expect(400)
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        res.status.should.equal(400);
        res
          .body[0]
          .error
          .should.equal('Please provide a username with at least 5 characters.');
        done();
      });
  });

  

  it('Should throw error if fullname is empty', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noFullName)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body[0].error.should.equal('Your Fullname is required');
        done();
      });
  });

  it('Should register a new user when provided request body is valid', (done) => {
    server
      .post('/api/v1/users/signup')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(signUp)
      .expect(201)
      .end((err, res) => {
        if(err){
          console.log(err);
        }
        res.status.should.equal(201);
        res.body.message.should.equal('Signed up successfully');
        const currentUser = jwt.decode(res.body.token);
        // const currentUser = res.body.token;
        expect(currentUser.currentUser.email).toEqual('zeno123@gmail.com');
        expect(currentUser.currentUser.username).toEqual('zeno123');
        expect(currentUser.currentUser.fullName).toEqual('Zeno of Citium');
        done();
      });
  });

  it('Should Check for existing username', (done) => {
    server
      .post('/api/v1/users/validate')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({ username: 'rufus' })
      .expect(409)
      .end((err, res) => {
        res.status.should.equal(409);
        res.body.message.should.equal('Username already exist');
        done();
      });
  });
});