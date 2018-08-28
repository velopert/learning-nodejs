const Sequelize = require('sequelize');
const db = require('database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: Sequelize.STRING,
  passwordHash: Sequelize.STRING,
});

User.checkUsernameExists = async (username) => {
  const exists = await User.findOne({
    where: {
      username,
    },
  });
  return !!exists;
};

User.register = async ({ username, password }) => {
  const hash = await bcrypt.hash(password, 10);
  const user = await User.build({
    username,
    passwordHash: hash,
  }).save();
  return user;
};

User.prototype.checkPassword = async function checkPassword(password) {
  const match = await bcrypt.compare(password, this.passwordHash);
  console.log(match);
  return match;
};

User.prototype.generateToken = function generateToken() {
  const secret = process.env.JWT_SECRET;
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: this.id,
        username: this.username,
      },
      secret,
      {
        expiresIn: '7d',
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      },
    );
  });
};

module.exports = User;
