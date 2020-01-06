module.exports = {
  env: {
    browser: true,
    es6: true,
    commonjs: true
  },
  extends: 'eslint:recommended',
  rules: {
    quotes: ['error', 'single']
  },
  parserOptions: {
    sourceType: 'module'
  }
}
  