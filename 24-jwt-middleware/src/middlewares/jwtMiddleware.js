const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

module.exports = async (ctx, next) => {
  const token = ctx.cookies.get('token');
  if (!token) {
    ctx.user = null;
    return next();
  }
  const verification = new Promise((resolve, reject) => {
    jwt.verify(ctx.cookies.get('token'), secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
  try {
    const decoded = await verification;
    const { id, username } = decoded;
    ctx.user = {
      id,
      username,
    };
    // 3일 이하 남으면 토큰 재설정
    if (decoded.exp - Date.now() < 1000 * 60 * 60 * 24 * 3) {
      const newToken = await new Promise((resolve, reject) => {
        jwt.sign(
          {
            id,
            username,
          },
          secret,
          {
            expiresIn: '7d',
          },
          (err, t) => {
            if (err) reject(err);
            resolve(t);
          },
        );
      });
      ctx.cookies.set('token', newToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
    }
  } catch (e) {
    ctx.user = null;
  }
  return next();
};
