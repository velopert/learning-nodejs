require('dotenv').config();
const db = require('./db');
const Post = require('./models/post');

async function sync() {
  try {
    await db.authenticate();
    await Post.sync();
  } catch (e) {
    console.error(e);
  }
}

sync();
