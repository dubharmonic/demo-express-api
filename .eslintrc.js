module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['mocha', 'prettier'],
  rules: {
    'no-console': 'off',
  },
  env: {
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 8,
  },
};
