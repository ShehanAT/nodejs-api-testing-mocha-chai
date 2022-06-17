// const dotenv = require( 'dotenv' );
import dotenv from 'dotenv';
dotenv.config();

export const dbConfig = {
// module.exports.dbConfig = {
  development: {
    username: 'Cleanthes123',
    password: '12345',
    database: 'bookSystem',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'DATABASE_TEST_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};