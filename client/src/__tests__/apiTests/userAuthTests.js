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