const User = require('database/models/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const loginSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

exports.register = async (ctx) => {
  const result = Joi.validate(ctx.request.body, loginSchema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    const exists = await User.checkUsernameExists(username);
    if (exists) {
      ctx.body = {
        msg: 'username exists',
      };
      ctx.status = 409;
      return;
    }
    const user = await User.register({
      username,
      password,
    });
    const token = await user.generateToken();
    ctx.body = {
      id: user.id,
      username: user.username,
      token,
    };
    ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
  } catch (e) {
    ctx.throw(500, e);
  }
};
exports.login = async (ctx) => {
  const result = Joi.validate(ctx.request.body, loginSchema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        msg: 'user not found',
      };
      return;
    }
    const success = await user.checkPassword(password);
    if (!success) {
      ctx.body = {
        msg: 'wrong password',
      };
      ctx.status = 422;
      return;
    }
    const token = await user.generateToken();
    ctx.cookies.set('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    ctx.body = {
      id: user.id,
      username: user.username,
      token,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};
exports.check = async (ctx) => {
  if (!ctx.user) {
    ctx.status = 401;
    return;
  }
  ctx.body = ctx.user;
};

exports.logout = (ctx) => {
  ctx.cookies.set('token', null);
  ctx.body = {
    msg: 'logged out successfully',
  };
};
