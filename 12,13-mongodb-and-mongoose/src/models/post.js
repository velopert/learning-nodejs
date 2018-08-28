const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', Post);
// mongoose.exports = mongoose.model('Post', Post, 'custom_name');
