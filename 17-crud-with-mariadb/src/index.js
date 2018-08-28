require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const db = require('./database/db');
const api = require('./api');

db.authenticate()
  .then(() => {
    console.log('Database connection has been established');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터를 앱에 적용
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});
