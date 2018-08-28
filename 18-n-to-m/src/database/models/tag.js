const Sequelize = require('sequelize');
const db = require('database/db');

const Tag = db.define('tag', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: Sequelize.STRING,
});

Tag.getId = async (text) => {
  try {
    const tag = await Tag.findOne({
      where: { text },
    });
    if (tag) {
      return tag.id;
    }
    const created = await Tag.build({
      text,
    }).save();
    return created.id;
  } catch (e) {
    throw e;
  }
};

module.exports = Tag;
