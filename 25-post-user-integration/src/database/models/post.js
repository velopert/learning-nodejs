const Sequelize = require('sequelize');
const db = require('database/db');
const _ = require('lodash');
const User = require('./user');

const Post = db.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  userId: Sequelize.INTEGER,
});

Post.serialize = (data) => {
  const json = data.toJSON();
  const picked = _.pick(json, ['id', 'title', 'body', 'createdAt', 'updatedAt']);
  picked.tags = json.tags.map(tag => tag.text);
  picked.username = json.user && json.user.username;
  return picked;
};

Post.associate = () => {
  Post.belongsTo(User, {
    foreignKey: 'userId',
  });
};

module.exports = Post;
