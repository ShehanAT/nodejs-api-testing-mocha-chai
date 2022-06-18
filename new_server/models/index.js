import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import { dbConfig } from '../config/config.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];
const db = {};
// dotenv.load();
dotenv.config();
let sequelize;

console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
console.log("env: " + env);
// console.log("config.database: " + config.database);
// console.log("config.username: " + config.username);
// console.log("config.password: " + config.password);
// console.log("database url: " + process.env.DATABASE_URL);
// console.log("config: " + config);

if (env === 'development') {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
} else if (env === 'test') {
  sequelize = new Sequelize(process.env.DATABASE_TEST_URL);
  // sequelize = new Sequelize(config.database, config.username, config.password, config);
} else if (process.env.DATABASE_TEST_URL) {
  sequelize = new Sequelize(process.env.DATABASE_TEST_URL);
}
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // const model = sequelize
      // .import(path.join(__dirname, file));
      // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      const model = import(path.join(__dirname, file));
      // (sequelize, Sequelize.DataTypes);
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

// module.exports = db;
export default db;