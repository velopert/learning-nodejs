require('dotenv').config();
const db = require('./db');
const Post = require('./models/post');
const Tag = require('./models/tag');
const PostsTags = require('./models/postsTags');
const User = require('./models/user');
const associate = require('./associate');

async function sync() {
  associate();
  try {
    await db.authenticate();
    await Post.sync();
    await Tag.sync();
    await PostsTags.sync();
    await User.sync();
  } catch (e) {
    console.error(e);
  }
}

sync();
