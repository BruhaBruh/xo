/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  extends: ['eslint-config-default'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '@/components/*/**/*',
              '@/hooks/*/**/*',
              '@/layouts/*/**/*',
              '@/lib/*/**/*',
              '@/pages/*/**/*',
              '@/providers/*/**/*',
              '@/styles/*/**/*',
              '@/types/*/**/*',
            ],
            message: 'use public api',
          },
          {
            group: ['@/pages_/**/*'],
            message: 'use @/pages',
          },
          {
            group: ['../../*'],
            message: "don't use double parent import",
          },
        ],
      },
    ],
  },
};
