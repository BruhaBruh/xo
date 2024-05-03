/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: ['eslint-config-default'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
