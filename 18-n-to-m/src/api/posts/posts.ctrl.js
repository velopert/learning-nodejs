const Joi = require('joi');
const Post = require('database/models/post');
const Tag = require('database/models/tag');
const PostsTags = require('database/models/postsTags');

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

  try {
    const post = Post.build({
      title,
      body,
    });
    await post.save();
    // 여러개 생성
    const tagIds = await Promise.all(tags.map(tag => Tag.getId(tag)));
    await PostsTags.bulkCreate(tagIds.map(tagId => ({ postId: post.id, tagId })));

    // 포스트 다시 조회
    const postData = await Post.findById(post.id, {
      include: [Tag],
    });
    // 시리얼라이징
    ctx.body = Post.serialize(postData);
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.list = async (ctx) => {
  try {
    const posts = await Post.findAll({
      include: [Tag],
    });
    const serializedPosts = posts.map(Post.serialize);
    ctx.body = serializedPosts;
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
      include: [Tag],
    });
    if (!post) {
      // 포스트가 없음
      ctx.status = 404;
      return;
    }
    ctx.body = Post.serialize(post);
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
    const post = await Post.findById(parseInt(id, 10), {
      include: [Tag],
    });
    if (!post) {
      ctx.status = 404;
      return;
    }
    const { title, body, tags } = ctx.request.body;

    if (tags) {
      // 새로 추가해야하는 태그
      const tagsToAdd = tags.filter(tag => !post.tags.find(row => row.text === tag));
      const tagIdsToAdd = await Promise.all(tagsToAdd.map(Tag.getId));
      await PostsTags.bulkCreate(tagIdsToAdd.map(tagId => ({ postId: post.id, tagId })));

      // 삭제해야하는 태그
      // 이번에는 PostsTags 를 지워야 하므로, tagId 가 아닌 postsTagsId 를 선택함
      const postsTagsIdsToRemove = post.tags
        .filter(row => !tags.find(tag => tag === row.text))
        .map(row => row.posts_tags.id);
      await PostsTags.destroy({
        where: {
          id: postsTagsIdsToRemove,
        },
      });
    }

    await post.update({ title, body });
    const updated = await Post.findById(post.id, {
      include: [Tag],
    });
    ctx.body = Post.serialize(updated);
  } catch (e) {
    ctx.throw(500, e);
  }
};
