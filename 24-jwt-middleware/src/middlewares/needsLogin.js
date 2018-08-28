module.exports = (ctx, next) => {
  if (!ctx.user) {
    ctx.status = 401;
    ctx.body = 'not logged in';
    return null;
  }
  return next();
};
