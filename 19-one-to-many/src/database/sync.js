require('dotenv').config();
const db = require('./db');
const Post = require('./models/post');
const Tag = require('./models/tag');
const associate = require('./associate');

async function sync() {
  associate();
  try {
    await db.authenticate();
    await Post.sync();
    await Tag.sync();
  } catch (e) {
    console.error(e);
  }
}

sync();
