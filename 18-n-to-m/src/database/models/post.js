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

Post.serialize = (data) => {
  const serialized = data.toJSON();
  serialized.tags = serialized.tags.map(tag => tag.text);
  return serialized;
};

module.exports = Post;
