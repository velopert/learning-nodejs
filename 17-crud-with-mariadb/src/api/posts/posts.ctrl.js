const Joi = require('joi');
const Post = require('database/models/post');

exports.write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = Post.build({
    title,
    body,
  });

  try {
    await post.save();
  } catch (e) {
    ctx.throw(500, e);
  }

  ctx.body = post;
};

exports.list = async (ctx) => {
  try {
    const posts = await Post.findAll();
    ctx.body = posts;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findOne({
      where: {
        id: parseInt(id, 10),
      },
    });
    if (!post) {
      // 포스트가 없음
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(parseInt(id, 10));
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    await post.destroy();
    ctx.status = 204; // 성공했지만 보여줄 데이터는 없을 때 No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findById(parseInt(id, 10));
    if (!post) {
      ctx.status = 404;
      return;
    }
    const { title, body, tags } = ctx.request.body;
    await post.update({ title, body });
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
