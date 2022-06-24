import supertest from 'supertest';
import should from 'should';
import mocha from 'mocha';
import dotenv from 'dotenv';
import expect from 'expect';
import jwt from 'jsonwebtoken';

import app from '../../new_server/server.js';
import models from '../../new_server/models/index.js';
import userSeeder from '../../new_server/seeders/userSeeder.js';

const server = supertest.agent(app);

// before((done) => {
//     models.sequelize.sync({ force: true }).then(() => {

//     }).catch((errors) => {
//         done(null);
//     }).catch((errors) => {
//         done(errors);
//     });
// });

describe('Server should: ', () => {
    it('return success message after GET / request', (done) => {
        server
            .get('/')
            .set('Connection', 'keep alive')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                if(err){
                    console.log(err);
                }
                res.status.should.equal(200);
                done();
            });
    });
});