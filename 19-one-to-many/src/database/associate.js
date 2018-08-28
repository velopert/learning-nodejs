const Tag = require('./models/tag');

function associate() {
  Tag.associate();
}

module.exports = associate;
