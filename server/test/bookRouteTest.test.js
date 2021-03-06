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
    addBook
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

describe('Book Api: ', async () => {
    const randomId = Math.floor(Math.random() * 10);
    const xAccessToken = await jwt.sign({ _id: randomId.toString() }, key);
    const expect = chai.expect;

    it('If user is logged in then request: GET /books should return a list of 3 books', (done) => {
        server
          .get('/api/v1/books')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('x-access-token', 'Bearer ' + xAccessToken)

          .type('form')
        //   .expect(200)
          .end((err, res) => {
            if(err){
              console.log(err);
            }
            res.status.should.equal(200);
            done();
          });
      });

      it('If user is logged in then request: GET /users/:userId/books should return a list of books held by the user :userId', (done) => {
        server
          .get('/api/v1/users/3/books')
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
            res.body.message.length.should.equal(3);
            done();
          });
      });

      it('Should allow the user to create a new book and return it if the user is logged, via the request: POST /books', (done) => {
        server
          .post('/api/v1/books')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('x-access-token', 'Bearer ' + xAccessToken)
          .send([ addBook, adminUser ])
          .type('form')
          .expect(201)
          .end((err, res) => {
            if(err){
              console.log(err);
            }
            
            expect(res.body.book.bookId).to.not.be.null;
            expect(res.body.book.name).to.not.be.null;
            expect(res.body.book.isbn).to.not.be.null;
            expect(res.body.book.description).to.not.be.null;
            expect(res.body.book.productionYear).to.not.be.null;
            expect(res.body.book.categoryId).to.not.be.null;
            expect(res.body.book.author).to.not.be.null;
            expect(res.body.book.total).to.not.be.null;

            done();
          });
      });


      it('Should allow the user to borrow a book if the user is logged in, via the request: POST /users/{userId}/books', (done) => {
        server
          .post('/api/v1/users/4/books')
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .set('x-access-token', 'Bearer ' + xAccessToken)
          .send([ addBook, nonAdminUser ])
          .type('form')
          .expect(200)
          .end((err, res) => {
            if(err){
              console.log(err);
            }
            var expect = chai.expect;

            expect(res.body.rentedBook.bookId).to.not.be.null;
            expect(res.body.rentedBook.userId).to.not.be.null;
            expect(res.body.rentedBook.returned).to.be.false;

            done();
          });
      });
});