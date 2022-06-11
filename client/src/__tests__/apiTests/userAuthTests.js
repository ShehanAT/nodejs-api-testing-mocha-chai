import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import expect from 'expect';
import jwt from 'jsonwebtoken';

import app from '../server';
import models from '../server/models/';
import userSeeder from '../server/seeders/userSeeder';

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

    it('should check that username exceeds 4 characters', (done) => {
        server
          .post('/api/v1/users/signup')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .send(usernameMin5)
          .expect(400)
          .end((err, res) => {
            res.status.should.equal(400);
            res
              .body[0]
              .error
              .should.equal('Please provide a username with atleast 4 characters.');
            done();
          });
      });





});