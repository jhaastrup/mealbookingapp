const dotenv = require('dotenv');

dotenv.config();
const {
  DB_USER, DB_NAME, DB_PASSWORD, DB_NAME_TEST, DB_HOST
} = process.env;
module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
  }
};
