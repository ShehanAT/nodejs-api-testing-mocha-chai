import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import expect from 'expect';
import jwt from 'jsonwebtoken';

import app from '../../new_server/server.js';
import models from '../../new_server/models/index.js';
import userSeeder from '../../new_server/seeders/userSeeder.js';
import bookSeeder from '../../new_server/seeders/bookSeeder.js';

const {
    listOfBooks
} = bookSeeder;

const server = supertest.agent(app);
const token = process.env.testToken;


before((done) => {
    models.sequelize.sync({ force: true }).then(() => {
      done(null);
    }).catch((errors) => {
      done(errors);
    });
  });

describe('Book Api: ', () => {
    const xAccessToken = await jwt.sign({_id:this._id.toString()},'Express')
    
    it('If user is logged in then request: GET /books should ', (done) => {
        server
          .get('/api/v1/books')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('x-access-token', '')

          .type('form')
        //   .expect(200)
          .end((err, res) => {
            if(err){
              console.log(err);
            }
            console.log(res.body.message);
            // res.status.should.equal(200);
            done();
          });
      });

});