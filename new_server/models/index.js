import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import { dbConfig } from '../config/config.js';
// let dbConfig = require('../config/config.js');
import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);
// const __dirname = path.join(Array.from(new URL('.', import.meta.url).pathname).slice(0, -1).join(""));
// const __dirname = path.join(new URL('.', import.meta.url).pathname);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};
dotenv.config();
let sequelize;

if (env === 'development') {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
} else if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else if (process.env.DATABASE_TEST_URL) {
  sequelize = new Sequelize(process.env.DATABASE_TEST_URL);
}
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize
      .import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object
  .keys(db)
  .forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;