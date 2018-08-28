const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터를 앱에 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log('Server is listening to port 3000');
});
