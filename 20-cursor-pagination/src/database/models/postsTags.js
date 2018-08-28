const Sequelize = require('sequelize');
const db = require('database/db');
const Tag = require('./tag');
const Post = require('./post');

const PostsTags = db.define('posts_tags', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  postId: Sequelize.INTEGER,
  tagId: Sequelize.INTEGER,
});

PostsTags.associate = () => {
  Post.belongsToMany(Tag, {
    through: {
      model: PostsTags,
    },
    foreignKey: 'postId',
  });
  Tag.belongsToMany(Post, {
    through: {
      model: PostsTags,
    },
    foreignKey: 'tagId',
  });
};

module.exports = PostsTags;
