const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log(ctx.url);
  console.log(1);
  await next();
  console.log('끝났다!');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx, next) => {
  console.log(3);
  ctx.body = '안녕하세요 Koa!';
});

app.listen(4000, () => {
  console.log('Server is listening to port 4000');
});