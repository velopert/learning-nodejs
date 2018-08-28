const Sequelize = require('sequelize');
const db = require('database/db');

const Post = db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
});

module.exports = Post;
