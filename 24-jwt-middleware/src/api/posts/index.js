const Router = require('koa-router');
const needsLogin = require('middlewares/needsLogin');
const postCtrl = require('./posts.ctrl');

const posts = new Router();

const post = new Router(); // 단일 포스트 전용
post.get('/', postCtrl.read);
post.delete('/', needsLogin, postCtrl.remove);
post.patch('/', needsLogin, postCtrl.update);

posts.use('/:id', post.routes());

posts.get('/', postCtrl.list);
posts.post('/', needsLogin, postCtrl.write);

module.exports = posts;
