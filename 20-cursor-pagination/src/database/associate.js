const PostsTags = require('./models/postsTags');

function associate() {
  PostsTags.associate();
}

module.exports = associate;
