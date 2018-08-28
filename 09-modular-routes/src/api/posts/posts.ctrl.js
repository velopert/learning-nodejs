exports.write = (ctx) => {
  ctx.body = '쓰기';
};

exports.list = (ctx) => {
  ctx.body = '리스팅';
};

exports.read = (ctx) => {
  ctx.body = '읽기';
};

exports.remove = (ctx) => {
  ctx.body = '삭제';
};

exports.replace = (ctx) => {
  ctx.body = '통째로 교체';
};

exports.update = (ctx) => {
  ctx.body = '일부 수정';
};
