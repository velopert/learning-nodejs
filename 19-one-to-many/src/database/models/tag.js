const Sequelize = require('sequelize');
const db = require('database/db');
const Post = require('./post');

const Tag = db.define('tag', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: Sequelize.STRING,
  postId: Sequelize.INTEGER,
});

Tag.associate = () => {
  Post.hasMany(Tag, {
    foreginKey: 'postId',
  });
};

module.exports = Tag;
