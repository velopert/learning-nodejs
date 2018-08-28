const Koa = require('koa');

const app = new Koa();

// 미들웨어는 등록 되는 순서대로 처리됩니다
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log('다 끝날때까지 날 부르지 말아요');
});

app.use((ctx, next) => {
  console.log(2);
  next();
});

app.use((ctx) => {
  console.log('야호!');
  ctx.body = '안녕하세요! Koa';
});

app.listen(3000, () => {
  console.log('Server is listening to port 3000');
});
