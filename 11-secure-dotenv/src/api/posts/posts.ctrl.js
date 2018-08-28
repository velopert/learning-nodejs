const Post = {
  id: 1,
  posts: [
    {
      id: 1,
      title: '제목',
      body: '내용',
    },
  ],
  create({ title, body }) {
    this.id += 1;
    const post = {
      id: this.id,
      title,
      body,
    };
    this.posts.push(post);
    return post;
  },
  getPostIndex(id) {
    return this.posts.findIndex(post => post.id === id);
  },
  findPostById(id) {
    return this.posts.find(post => post.id === id);
  },
  removePostById(id) {
    const index = this.getPostIndex(id);
    this.posts.splice(index, 1);
  },
  updatePost(id, data, replace) {
    const index = this.getPostIndex(id);
    if (replace) {
      // 전체를 교체함
      this.posts[index] = {
        // 기존에 있던건 무시하고 방금 데이터만 넣음
        ...data,
        id, // id 는 바뀌지 않도록 해준다
      };
    } else {
      this.posts[index] = {
        ...this.posts[index], // 기존의 것들은 유지하면서
        ...data, // 새로 받은 데이터들 받아오기
        id, // 여기서도 id 는 바뀌지 않게끔
      };
    }
    return this.posts[index];
  },
};

exports.write = (ctx) => {
  const post = Post.create(ctx.request.body);
  ctx.body = post;
};

exports.list = (ctx) => {
  ctx.body = Post.posts;
};

exports.read = (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  ctx.body = Post.findPostById(id);
};

exports.remove = (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  ctx.body = Post.removePostById(id);
};

exports.replace = (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  const post = Post.updatePost(id, ctx.request.body, true);
  ctx.body = post;
};

exports.update = (ctx) => {
  const id = parseInt(ctx.params.id, 10);
  const post = Post.updatePost(id, ctx.request.body, false);
  ctx.body = post;
};
