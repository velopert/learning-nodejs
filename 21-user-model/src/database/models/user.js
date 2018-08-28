const Sequelize = require('sequelize');
const db = require('database/db');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  passwordHash: Sequelize.STRING,
});

module.exports = User;
