module.exports = {
  env: {
    commonjs: true,
    jest: true,
    node: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    jest: 'true',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
