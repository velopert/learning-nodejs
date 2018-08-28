const PostsTags = require('./models/postsTags');
const Post = require('./models/post');

function associate() {
  PostsTags.associate();
  Post.associate();
}

module.exports = associate;
