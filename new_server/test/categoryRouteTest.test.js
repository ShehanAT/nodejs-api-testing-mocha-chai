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
import chai from 'chai';

const key = process.env.SECRETKEY;

const {
    listOfBooks,
    rentedBooks,
    addBook,
    listOfBookCategories
} = bookSeeder;

const {
    adminUser,
    nonAdminUser
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


describe('Book Categories Api: ', async () => {
    const randomId = Math.floor(Math.random() * 10);
    const xAccessToken = await jwt.sign({ _id: randomId.toString() }, key);
    const expect = chai.expect;

    it('If user is logged in then request: GET /books should return a list of 3 books', (done) => {
        server
          .get('/api/v1/category')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('x-access-token', 'Bearer ' + xAccessToken)
          .type('form')
          .expect(200)
          .end((err, res) => {
            if(err){
              console.log(err);
            }
            res.status.should.equal(200);
            expect(res.body.categories.length).to.be.greaterThan(5);
            done();
          });
    });


});