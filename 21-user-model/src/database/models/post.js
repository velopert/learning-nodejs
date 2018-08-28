const Sequelize = require('sequelize');
const db = require('database/db');
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
  const serialized = data.toJSON();
  serialized.tags = serialized.tags.map(tag => tag.text);
  return serialized;
};

Post.associate = () => {
  Post.belongsTo(User, {
    foreignKey: 'userId',
  });
};

module.exports = Post;
