const Router = require('koa-router');
const posts = require('./posts');

const api = new Router();

// api.get('/test', (ctx) => {
//   ctx.body = 'api 라우트 테스트';
// });
api.use('/posts', posts.routes());

module.exports = api;
