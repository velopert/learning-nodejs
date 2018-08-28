const path = require('path');

module.exports = {
  extends: 'airbnb-base',
  settings: {
    'import/resolver': {
      node: { paths: [path.resolve('./src')] },
    },
  },
  rules: {
    'no-console': 0,
  },
};
