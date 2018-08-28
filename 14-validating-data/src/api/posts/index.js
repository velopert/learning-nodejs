const Router = require('koa-router');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

const post = new Router(); // 단일 포스트 전용
post.get('/', postCtrl.read);
post.delete('/', postCtrl.remove);
post.patch('/', postCtrl.update);

posts.use('/:id', postCtrl.checkObjectId, post.routes());

posts.get('/', postCtrl.list);
posts.post('/', postCtrl.write);

module.exports = posts;
