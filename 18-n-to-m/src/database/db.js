const Sequelize = require('sequelize');

const {
  DB_HOST, DB_DATABASE, DB_USER, DB_PASS,
} = process.env;

const db = new Sequelize(DB_DATABASE, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5, // 동시에 최대 5개 연결
    min: 0, // 최소 0개
    acquire: 30000, // 연결하는데 최대 30초 걸리도록 설정
    idle: 10000, // 10초동안 요청 없으면 연결 끊어놓음
  },
});

module.exports = db;
