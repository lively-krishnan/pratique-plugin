// 管理的浏览器全局变量列表
const confusingBrowserGlobals = require('confusing-browser-globals')
  .filter((name) => !['location', 'history'].includes(name))
  .concat(['isFinite', 'isNaN'])

module.exports = {
  env: {
    jest: true,
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    properties: 'always',
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'prettier'],
  settings: {
    // todo dedupe with same named rule
    'import/extensions': ['off'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  // add your custom rules here
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'prettier/prettier': ['warn'],
    'no-console': 'off',
    'global-require': 0,
    'no-dupe-args': 2,
    'no-empty': ['warn', { allowEmptyCatch: true }],
    'no-unused-vars': ['warn', { args: 'none' }],
    'prefer-destructuring': ['off'],
    'default-case': ['off'],
    'no-loop-func': ['off'],
    'no-shadow': ['off'],
    'class-methods-use-this': ['off'],
    'no-plusplus': ['off'],
    'func-names': ['error', 'never'],
    'no-param-reassign': ['off'],
    'arrow-body-style': ['off'],
    'import/prefer-default-export': ['off'],
    'import/no-unresolved': ['off'],
    'import/extensions': ['off'],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'require-await': 'error',
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-restricted-globals': ['error'].concat(confusingBrowserGlobals),
    'consistent-return': ['off'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-prototype-builtins': ['off'],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'guard-for-in': ['off'],
  },
}
